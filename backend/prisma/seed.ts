import { hash } from 'bcrypt';
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
// import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  const hashedPassword = await hash('senha123', 10);

  const user = await prisma.user.upsert({
    where: { email: 'rickreis@gmail.com' },
    update: {},
    create: {
      email: 'rickreis@gmail.com',
      name: 'Rick Reis',
      password: hashedPassword,
      tasks: {
        create: [
          {
            title: 'Fazer a massa do pão',
            description: 'Preparar a massa para os pedidos de amanhã',
            status: 'PENDING',
          },
          {
            title: 'Organizar pedidos',
            description: 'Separar os pedidos por cliente',
            status: 'IN_PROGRESS',
          },
          {
            title: 'Entregar pães',
            description: 'Levar os pães para os clientes cadastrados',
            status: 'COMPLETED',
          },
        ],
      },
    },
  });

  console.log(`✅ Seed completo para o usuário: ${user.email}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
