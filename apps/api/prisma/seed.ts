import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const plans = [
    { name: 'Basic', setupFeeInr: 4999, monthlyFeeInr: 1499, visitFrequencyPerMonth: 1 },
    { name: 'Standard', setupFeeInr: 7999, monthlyFeeInr: 2499, visitFrequencyPerMonth: 2 },
    { name: 'Premium', setupFeeInr: 11999, monthlyFeeInr: 3999, visitFrequencyPerMonth: 4 },
  ];

  for (const plan of plans) {
    await prisma.plan.upsert({
      where: { name: plan.name },
      update: plan,
      create: plan,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

