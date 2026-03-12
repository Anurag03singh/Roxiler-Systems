import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Hash password helper
  const hashPassword = async (password: string) => {
    return await bcrypt.hash(password, 10);
  };

  // Create Admins
  const admin1 = await prisma.user.upsert({
    where: { email: 'admin@modak-cafe.com' },
    update: {},
    create: {
      name: 'System Administrator',
      email: 'admin@modak-cafe.com',
      password: await hashPassword('Admin@123'),
      address: 'Modak-Cafe HQ, Sanawad, Madhya Pradesh',
      role: Role.ADMIN,
    },
  });

  const admin2 = await prisma.user.upsert({
    where: { email: 'admin2@modak-cafe.com' },
    update: {},
    create: {
      name: 'Secondary Admin',
      email: 'admin2@modak-cafe.com',
      password: await hashPassword('Admin@456'),
      address: 'Modak-Cafe Branch Office, Indore',
      role: Role.ADMIN,
    },
  });

  console.log('✅ Created admins');

  // Create Store Owners
  const owner1 = await prisma.user.upsert({
    where: { email: 'owner@store1.com' },
    update: {},
    create: {
      name: 'Rajesh Kumar',
      email: 'owner@store1.com',
      password: await hashPassword('Owner@123'),
      address: 'Main Street, Sanawad',
      role: Role.STORE_OWNER,
    },
  });

  const owner2 = await prisma.user.upsert({
    where: { email: 'owner@store2.com' },
    update: {},
    create: {
      name: 'Priya Sharma',
      email: 'owner@store2.com',
      password: await hashPassword('Owner@456'),
      address: 'Market Road, Sanawad',
      role: Role.STORE_OWNER,
    },
  });

  const owner3 = await prisma.user.upsert({
    where: { email: 'owner@store3.com' },
    update: {},
    create: {
      name: 'Amit Patel',
      email: 'owner@store3.com',
      password: await hashPassword('Owner@789'),
      address: 'Gandhi Chowk, Sanawad',
      role: Role.STORE_OWNER,
    },
  });

  console.log('✅ Created store owners');

  // Create Stores
  const store1 = await prisma.store.upsert({
    where: { id: '00000000-0000-0000-0000-000000000001' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000001',
      name: 'Modak-Cafe Main Branch',
      email: 'main@modak-cafe.com',
      address: 'Shop 12, Main Street, Sanawad, Madhya Pradesh - 451111',
      ownerId: owner1.id,
    },
  });

  const store2 = await prisma.store.upsert({
    where: { id: '00000000-0000-0000-0000-000000000002' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000002',
      name: 'Sweet Delights Cafe',
      email: 'contact@sweetdelights.com',
      address: 'Plot 45, Market Road, Sanawad, Madhya Pradesh - 451111',
      ownerId: owner2.id,
    },
  });

  const store3 = await prisma.store.upsert({
    where: { id: '00000000-0000-0000-0000-000000000003' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000003',
      name: 'Bistro Paradise',
      email: 'hello@bistroparadise.com',
      address: 'Building 7, Gandhi Chowk, Sanawad, Madhya Pradesh - 451111',
      ownerId: owner3.id,
    },
  });

  console.log('✅ Created stores');

  // Create Normal Users
  const users = [];
  for (let i = 1; i <= 5; i++) {
    const user = await prisma.user.upsert({
      where: { email: `user${i}@example.com` },
      update: {},
      create: {
        name: `User ${i}`,
        email: `user${i}@example.com`,
        password: await hashPassword('User@123'),
        address: `Address ${i}, Sanawad, Madhya Pradesh`,
        role: Role.USER,
      },
    });
    users.push(user);
  }

  console.log('✅ Created normal users');

  // Create Sample Ratings
  const ratings = [
    { userId: users[0].id, storeId: store1.id, rating: 5 },
    { userId: users[0].id, storeId: store2.id, rating: 4 },
    { userId: users[1].id, storeId: store1.id, rating: 5 },
    { userId: users[1].id, storeId: store3.id, rating: 3 },
    { userId: users[2].id, storeId: store1.id, rating: 4 },
    { userId: users[2].id, storeId: store2.id, rating: 5 },
    { userId: users[3].id, storeId: store2.id, rating: 4 },
    { userId: users[3].id, storeId: store3.id, rating: 5 },
    { userId: users[4].id, storeId: store1.id, rating: 5 },
    { userId: users[4].id, storeId: store3.id, rating: 4 },
  ];

  for (const rating of ratings) {
    await prisma.rating.upsert({
      where: {
        userId_storeId: {
          userId: rating.userId,
          storeId: rating.storeId,
        },
      },
      update: {},
      create: rating,
    });
  }

  console.log('✅ Created sample ratings');
  console.log('🎉 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
