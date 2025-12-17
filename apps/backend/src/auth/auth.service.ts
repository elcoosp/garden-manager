// apps/backend/src/auth/auth.service.ts
import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { Repository, MoreThan } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { randomBytes } from 'crypto';
import {
  AuthResponse,
  MessageResponse
} from './auth.resp';
import type {
  RegisterDto,
  LoginDto,
  ForgotPasswordDto,
  ResetPasswordDto
} from './auth.dto'
import { UserEntity } from 'src/database/entities';

// You'll need to create this entity or add fields to UserEntity
// For now, I'll assume we add these fields to UserEntity
// In reality, you might want a separate PasswordResetToken entity

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto): Promise<AuthResponse> {
    const existingUser = await this.usersRepository.findOne({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new UnauthorizedException('Email already exists');
    }

    const passwordHash = await hash(dto.password, 10);

    const user = this.usersRepository.create({
      email: dto.email,
      passwordHash,
      name: dto.name,
    });

    await this.usersRepository.save(user);

    const payload = { sub: user.id, email: user.email };
    const accessToken = await this.jwtService.signAsync(payload);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
      },
      accessToken,
    };
  }

  async login(dto: LoginDto): Promise<AuthResponse> {
    const user = await this.usersRepository.findOne({
      where: { email: dto.email },
    });

    if (!user || !(await compare(dto.password, user.passwordHash))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email };
    const accessToken = await this.jwtService.signAsync(payload);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
      },
      accessToken,
    };
  }

  async forgotPassword(dto: ForgotPasswordDto): Promise<MessageResponse> {
    const user = await this.usersRepository.findOne({
      where: { email: dto.email },
    });

    if (!user) {
      // Don't reveal that the user doesn't exist for security reasons
      return { message: 'If your email exists in our system, you will receive a password reset link.' };
    }

    // Generate a reset token (valid for 1 hour)
    const resetToken = randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

    // Store the reset token in the database
    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry;
    await this.usersRepository.save(user);

    // In a real application, you would send an email here
    // For now, we'll log the token for testing
    console.log(`Password reset token for ${user.email}: ${resetToken}`);
    console.log(`Reset link: http://yourapp.com/reset-password?token=${resetToken}`);

    return { 
      message: 'If your email exists in our system, you will receive a password reset link.' 
    };
  }

  async resetPassword(dto: ResetPasswordDto): Promise<MessageResponse> {
    // Find user by reset token and check if it's not expired
    const user = await this.usersRepository.findOne({
      where: {
        resetToken: dto.token,
        resetTokenExpiry: MoreThan(new Date()), // Token not expired
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid or expired reset token');
    }

    // Hash the new password
    const passwordHash = await hash(dto.newPassword, 10);
    
    // Update password and clear reset token
    user.passwordHash = passwordHash;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    
    await this.usersRepository.save(user);

    return { message: 'Password has been successfully reset. You can now login with your new password.' };
  }

  async validateUser(userId: string): Promise<UserEntity|null> {
    return this.usersRepository.findOne({ where: { id: userId } });
  }
}