import { IsEmail, IsString, MinLength, MaxLength, IsOptional } from 'class-validator';

export class CreateStoreDto {
  @IsString()
  @MinLength(20, { message: 'Name must be at least 20 characters' })
  @MaxLength(60, { message: 'Name must not exceed 60 characters' })
  name: string;

  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsOptional()
  @IsString()
  @MinLength(1, { message: 'Address must be at least 1 character' })
  @MaxLength(400, { message: 'Address must not exceed 400 characters' })
  address?: string;
}
