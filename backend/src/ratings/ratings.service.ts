import { Injectable, NotFoundException, ConflictException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';

@Injectable()
export class RatingsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createRatingDto: CreateRatingDto) {
    // Check if store exists
    const store = await this.prisma.store.findUnique({
      where: { id: createRatingDto.storeId },
    });

    if (!store) {
      throw new NotFoundException('Store not found');
    }

    // Check if user already rated this store
    const existingRating = await this.prisma.rating.findUnique({
      where: {
        userId_storeId: {
          userId,
          storeId: createRatingDto.storeId,
        },
      },
    });

    if (existingRating) {
      throw new ConflictException('You have already rated this store');
    }

    return this.prisma.rating.create({
      data: {
        userId,
        storeId: createRatingDto.storeId,
        rating: createRatingDto.rating,
      },
      include: {
        store: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async update(id: string, userId: string, updateRatingDto: UpdateRatingDto) {
    const rating = await this.prisma.rating.findUnique({
      where: { id },
    });

    if (!rating) {
      throw new NotFoundException('Rating not found');
    }

    if (rating.userId !== userId) {
      throw new ForbiddenException('You can only update your own ratings');
    }

    return this.prisma.rating.update({
      where: { id },
      data: { rating: updateRatingDto.rating },
      include: {
        store: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async getUserRatings(userId: string) {
    return this.prisma.rating.findMany({
      where: { userId },
      include: {
        store: {
          select: {
            id: true,
            name: true,
            address: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getStoreRatings(storeId: string) {
    return this.prisma.rating.findMany({
      where: { storeId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
