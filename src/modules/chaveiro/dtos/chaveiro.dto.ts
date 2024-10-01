import { Prisma } from '@prisma/client';
// eslint-disable-next-line linebreak-style

export const ChaveiroDto = Prisma.validator<Prisma.ChaveiroSelect>()({
  id: true,
  name: true,
  status: true,
  phone: true,
  imageUrl: true,
  endereco: true,
});
