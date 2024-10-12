// eslint-disable-next-line linebreak-style
import { Prisma, PrismaClient, AccountRole } from '@prisma/client';
import PasswordHelper from '../../src/utils/helpers/password.helper';


const user: Prisma.UserCreateInput = {
  role: AccountRole.user,
  //type: UserType.web,
  name: 'User 01',
  email: 'user1@gmail.com',
  password: PasswordHelper.hash('123456789'),
  //birthDate: '2000-01-01',
  phone: '999999999',
  //cpf: '12345678901',
  //status: AccountStatus.ativo,
};

export async function seedUser(prisma: PrismaClient): Promise<void> {
  await prisma.user.create({
    data: user,
  });

  console.log('User seed OK.');
}
