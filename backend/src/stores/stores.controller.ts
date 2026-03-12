import { Controller, Get, Post, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { StoresService } from './stores.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Get('stores')
  async findAll(@Query('search') search?: string) {
    return this.storesService.findAll({ search });
  }

  @Get('stores/:id')
  async findOne(@Param('id') id: string) {
    return this.storesService.findOne(id);
  }

  @Post('admin/stores')
  @Roles(Role.ADMIN)
  async create(@Body() createStoreDto: CreateStoreDto) {
    return this.storesService.create(createStoreDto);
  }

  @Get('stores/:id/ratings')
  @Roles(Role.STORE_OWNER, Role.ADMIN)
  async getStoreRatings(@Param('id') id: string) {
    return this.storesService.getStoreRatings(id);
  }

  @Get('my-stores')
  @Roles(Role.STORE_OWNER)
  async getMyStores(@Request() req) {
    return this.storesService.getUserStores(req.user.userId);
  }

  @Get('dashboard/stats')
  @Roles(Role.ADMIN)
  async getDashboardStats() {
    // This will be implemented in a separate dashboard service
    return { message: 'Dashboard stats endpoint' };
  }
}
