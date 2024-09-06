import { Prisma } from '@prisma/client';
// eslint-disable-next-line linebreak-style

export const RegisterDto = Prisma.validator<Prisma.UserSelect>()({
  id: true,
  birthDate: true,
  cpf: true,
  phone: true,
  email: true,
  name: true,
  password: false,
  imageUrl: true,
  role: true,
  status: true,
  createdAt: true,
  updatedAt: true,
});
