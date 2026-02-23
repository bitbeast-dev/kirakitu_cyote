import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const mainCategories = [
    'Electronics',
    'Home Appliances',
    'Personal Care & Grooming',
    'Audio & Radios',
    'Home & Living'
  ];

  for (const name of mainCategories) {
    await prisma.category.upsert({
      where: { name },
      update: {},
      create: { name }
    });
  }

  console.log('✓ Seeded 5 main categories');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
