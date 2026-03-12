import { IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class UpdatePasswordDto {
  @IsString()
  currentPassword: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  @MaxLength(16, { message: 'Password must not exceed 16 characters' })
  @Matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])/, {
    message: 'Password must contain at least 1 uppercase letter and 1 special character (!@#$%^&*)',
  })
  newPassword: string;
}
