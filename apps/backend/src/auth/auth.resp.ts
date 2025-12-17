import { ApiProperty } from "@nestjs/swagger";

export class User {
  @ApiProperty()
  id: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  createdAt: Date;
}

export class AuthResponse {
  @ApiProperty()
  user: User;
  @ApiProperty()
  accessToken: string;
  @ApiProperty()
  refreshToken?: string;
}