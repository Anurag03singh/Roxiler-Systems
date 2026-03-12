import { Controller, Get, Post, Body, Param, Put, Query, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('admin/users')
  @Roles(Role.ADMIN)
  async findAll(
    @Query('name') name?: string,
    @Query('email') email?: string,
    @Query('address') address?: string,
    @Query('role') role?: Role,
  ) {
    return this.usersService.findAll({ name, email, address, role });
  }

  @Get('admin/users/:id')
  @Roles(Role.ADMIN)
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Post('admin/users')
  @Roles(Role.ADMIN)
  async create(@Body() createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    return this.usersService.create({
      ...createUserDto,
      password: hashedPassword,
    });
  }

  @Put('users/password')
  async updatePassword(@Request() req, @Body() updatePasswordDto: UpdatePasswordDto) {
    return this.usersService.updatePassword(req.user.userId, updatePasswordDto);
  }

  @Get('users/me')
  async getProfile(@Request() req) {
    return this.usersService.findOne(req.user.userId);
  }
}
