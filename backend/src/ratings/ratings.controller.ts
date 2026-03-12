import { Controller, Get, Post, Put, Body, Param, UseGuards, Request } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller('ratings')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @Post()
  @Roles(Role.USER)
  async create(@Request() req, @Body() createRatingDto: CreateRatingDto) {
    return this.ratingsService.create(req.user.userId, createRatingDto);
  }

  @Put(':id')
  @Roles(Role.USER)
  async update(
    @Param('id') id: string,
    @Request() req,
    @Body() updateRatingDto: UpdateRatingDto,
  ) {
    return this.ratingsService.update(id, req.user.userId, updateRatingDto);
  }

  @Get('my-ratings')
  @Roles(Role.USER)
  async getMyRatings(@Request() req) {
    return this.ratingsService.getUserRatings(req.user.userId);
  }
}
