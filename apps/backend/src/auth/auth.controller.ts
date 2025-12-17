// apps/backend/src/auth/auth.controller.ts
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  RegisterDto,
  LoginDto,
  ForgotPasswordDto,
  ResetPasswordDto
} from "./auth.dto"
import {
  User,
  AuthResponse,
  MessageResponse
} from './auth.resp';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @ApiCreatedResponse({
    description: 'The user has been successfully created.',
    type: AuthResponse,
  })
  @Post('register')
  @ApiBody({ type: RegisterDto })
  async register(@Body() dto: RegisterDto): Promise<AuthResponse> {
    return this.authService.register(dto);
  }
  
  @ApiCreatedResponse({
    description: 'User logged in successfully.',
    type: AuthResponse,
  })
  @Post('login')
  @ApiBody({ type: LoginDto })
  async login(@Body() dto: LoginDto): Promise<AuthResponse> {
    return this.authService.login(dto);
  }

  @ApiOkResponse({
    description: 'Password reset email sent.',
    type: MessageResponse,
  })
  @Post('forgot-password')
  @ApiBody({ type: ForgotPasswordDto })
  async forgotPassword(@Body() dto: ForgotPasswordDto): Promise<MessageResponse> {
    return this.authService.forgotPassword(dto);
  }

  @ApiOkResponse({
    description: 'Password has been reset.',
    type: MessageResponse,
  })
  @Post('reset-password')
  @ApiBody({ type: ResetPasswordDto })
  async resetPassword(@Body() dto: ResetPasswordDto): Promise<MessageResponse> {
    return this.authService.resetPassword(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req): User {
    return {
      id: req.user.id,
      email: req.user.email,
      name: req.user.name,
      createdAt: req.user.createdAt,
    };
  }
}