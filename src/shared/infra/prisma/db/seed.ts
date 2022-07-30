// prisma/seed.ts

import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

// WARNING: DONT CHANGE THIS
export const HASH_SALT = bcrypt.genSaltSync(10);

// initialize Prisma Client
const prisma = new PrismaClient();
const defaultPassword = bcrypt.hashSync('123456', HASH_SALT);

async function main() {
  if (process.env.ENVIRONMENT === 'prod') return;
  // create two dummy users
  const user1 = await prisma.user.upsert({
    where: { email: 'johndoe@zumub.com' },
    create: {
      name: 'John Doe',
      email: 'johndoe@zumub.com',
      username: 'johndoe',
      admin: 1,
      password: defaultPassword,
    },
    update: {},
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'johnbar@zumub.com' },
    create: {
      name: 'John Bar',
      email: 'johnbar@zumub.com',
      username: 'johnbar',
      admin: 0,
      password: defaultPassword,
    },
    update: {},
  });

  console.log({ user1, user2 });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
