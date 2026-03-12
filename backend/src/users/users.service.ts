import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import * as bcrypt from 'bcrypt';
import { Role } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto & { password: string; role?: Role }) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  async findAll(filters?: { name?: string; email?: string; address?: string; role?: Role }) {
    const where: any = {};
    
    if (filters?.name) {
      where.name = { contains: filters.name, mode: 'insensitive' };
    }
    if (filters?.email) {
      where.email = { contains: filters.email, mode: 'insensitive' };
    }
    if (filters?.address) {
      where.address = { contains: filters.address, mode: 'insensitive' };
    }
    if (filters?.role) {
      where.role = filters.role;
    }

    const users = await this.prisma.user.findMany({
      where,
      select: {
        id: true,
        name: true,
        email: true,
        address: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        ownedStores: {
          include: {
            ratings: true,
          },
        },
      },
    });

    return users.map(user => {
      const { ownedStores, ...userData } = user;
      let averageRating = null;
      
      if (user.role === Role.STORE_OWNER && ownedStores.length > 0) {
        const store = ownedStores[0];
        if (store.ratings.length > 0) {
          const sum = store.ratings.reduce((acc, r) => acc + r.rating, 0);
          averageRating = (sum / store.ratings.length).toFixed(1);
        }
      }
      
      return {
        ...userData,
        averageRating,
      };
    });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        ownedStores: {
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
        },
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { password, ...result } = user;
    return result;
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async updatePassword(userId: string, updatePasswordDto: UpdatePasswordDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(
      updatePasswordDto.currentPassword,
      user.password,
    );

    if (!isPasswordValid) {
      throw new ConflictException('Current password is incorrect');
    }

    const hashedPassword = await bcrypt.hash(updatePasswordDto.newPassword, 10);

    await this.prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    return { message: 'Password updated successfully' };
  }
}
