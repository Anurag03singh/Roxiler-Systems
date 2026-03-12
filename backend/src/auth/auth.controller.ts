import { Controller, Post, Body, UseGuards, Request, Response, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Response as ExpressResponse } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto, @Response() res: ExpressResponse) {
    const result = await this.authService.register(registerDto);
    
    res.cookie('access_token', result.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    
    return res.json({ user: result.user });
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto, @Request() req, @Response() res: ExpressResponse) {
    const result = await this.authService.login(req.user);
    
    res.cookie('access_token', result.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    
    return res.json({ user: result.user });
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Response() res: ExpressResponse) {
    res.clearCookie('access_token');
    return res.json({ message: 'Logged out successfully' });
  }
}
