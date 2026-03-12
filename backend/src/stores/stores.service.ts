import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class StoresService {
  constructor(private prisma: PrismaService) {}

  async create(createStoreDto: CreateStoreDto) {
    // Check if email already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email: createStoreDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    // Create store owner user
    const hashedPassword = await bcrypt.hash('Owner@123', 10);
    const owner = await this.prisma.user.create({
      data: {
        name: createStoreDto.name,
        email: createStoreDto.email,
        password: hashedPassword,
        address: createStoreDto.address,
        role: Role.STORE_OWNER,
      },
    });

    // Create store
    const store = await this.prisma.store.create({
      data: {
        name: createStoreDto.name,
        email: createStoreDto.email,
        address: createStoreDto.address,
        ownerId: owner.id,
      },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return store;
  }

  async findAll(filters?: { search?: string }) {
    const where: any = {};
    
    if (filters?.search) {
      where.OR = [
        { name: { contains: filters.search, mode: 'insensitive' } },
        { address: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    const stores = await this.prisma.store.findMany({
      where,
      include: {
        ratings: true,
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return stores.map(store => {
      const { ratings, ...storeData } = store;
      const averageRating = ratings.length > 0
        ? (ratings.reduce((acc, r) => acc + r.rating, 0) / ratings.length).toFixed(1)
        : null;
      
      return {
        ...storeData,
        averageRating,
        totalRatings: ratings.length,
      };
    });
  }

  async findOne(id: string) {
    const store = await this.prisma.store.findUnique({
      where: { id },
      include: {
        ratings: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!store) {
      throw new NotFoundException('Store not found');
    }

    const averageRating = store.ratings.length > 0
      ? (store.ratings.reduce((acc, r) => acc + r.rating, 0) / store.ratings.length).toFixed(1)
      : null;

    return {
      ...store,
      averageRating,
    };
  }

  async getStoreRatings(storeId: string) {
    const store = await this.prisma.store.findUnique({
      where: { id: storeId },
      include: {
        ratings: {
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
        },
      },
    });

    if (!store) {
      throw new NotFoundException('Store not found');
    }

    return store.ratings;
  }

  async getUserStores(userId: string) {
    return this.prisma.store.findMany({
      where: { ownerId: userId },
      include: {
        ratings: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });
  }
}
