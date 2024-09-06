// eslint-disable-next-line linebreak-style
import { Prisma, PrismaClient, AccountRole, AccountStatus, Permissions } from '@prisma/client';
import PasswordHelper from '../../src/utils/helpers/password.helper';

const admin: Prisma.AdminCreateInput = {
  role: AccountRole.admin,
  name: 'Handy Milliance',
  email: 'milliance23@gmail.com',
  imageUrl: 'http://4.bp.blogspot.com/-1cFylbwcTtE/UqMkUV_5-yI/AAAAAAAAF8w/OE8QEo8B1MY/s1600/PAISAGENS.jpg',
  password: PasswordHelper.hash('123456789'),
  status: AccountStatus.ativo,
};

export async function seedAdmin(prisma: PrismaClient) {

  const newAdmin = await prisma.admin.create({
    data: admin,
  });

  for (const permission of Object.values(Permissions)) {
    await prisma.permission.create({
      data: {
        title: permission,
        admins: {
          connect: { id: newAdmin.id },
        },
      },
    });
  }

  console.log('Admin user seed OK.');

}
