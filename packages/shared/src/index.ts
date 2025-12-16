// Export all types
export * from './types/auth';
export * from './types/garden';

// Export DTOs
export interface RegisterDto {
  email: string;
  password: string;
  name: string;
}

export interface LoginDto {
  email: string;
  password: string;
}