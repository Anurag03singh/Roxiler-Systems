import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('Successfully connected to database');
    } catch (error) {
      this.logger.error('Failed to connect to database:', error.message);
      // Continue anyway - the app will start but database operations will fail
      // This allows the server to start for development
    }
  }

  async onModuleDestroy() {
    try {
      await this.$disconnect();
    } catch (error) {
      this.logger.error('Error disconnecting from database:', error.message);
    }
  }
}
