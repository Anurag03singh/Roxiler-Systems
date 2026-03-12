import { IsEmail, IsString, MinLength, MaxLength, Matches, IsOptional, IsEnum } from 'class-validator';
import { Role } from '@prisma/client';

export class CreateUserDto {
  @IsString()
  @MinLength(20, { message: 'Name must be at least 20 characters' })
  @MaxLength(60, { message: 'Name must not exceed 60 characters' })
  name: string;

  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  @MaxLength(16, { message: 'Password must not exceed 16 characters' })
  @Matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])/, {
    message: 'Password must contain at least 1 uppercase letter and 1 special character (!@#$%^&*)',
  })
  password: string;

  @IsOptional()
  @IsString()
  @MinLength(1, { message: 'Address must be at least 1 character' })
  @MaxLength(400, { message: 'Address must not exceed 400 characters' })
  address?: string;

  @IsEnum(Role, { message: 'Invalid role' })
  role: Role;
}
