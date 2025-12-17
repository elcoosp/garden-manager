import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto {
  @ApiProperty()
  email: string;
  
  @ApiProperty()
  password: string;
  
  @ApiProperty()
  name: string;
}

export class LoginDto {
  @ApiProperty()
  email: string;
  
  @ApiProperty()
  password: string;
}

export class ForgotPasswordDto {
  @ApiProperty()
  email: string;
}

export class ResetPasswordDto {
  @ApiProperty()
  token: string;
  
  @ApiProperty()
  newPassword: string;
}