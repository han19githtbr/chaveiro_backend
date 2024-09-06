// eslint-disable-next-line linebreak-style
import { PrismaClient } from '@prisma/client';
import { seedAdmin } from './admin';
import { seedUser } from './user';
import { seedChaveiro } from './chaveiro';
import { seedService } from './service';
import { seedCliente } from './cliente';

const prisma = new PrismaClient();
async function main() {
  await seedAdmin(prisma);
  await seedUser(prisma);
  await seedChaveiro(prisma);
  await seedService(prisma);
  await seedCliente(prisma);
}

main()
.catch((e) => {
  console.error(e);
  process.exit(1);
})
.finally(async() => {
  await prisma.$disconnect();
});
