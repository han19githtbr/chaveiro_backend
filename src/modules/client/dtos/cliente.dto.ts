import { Prisma } from '@prisma/client';
// eslint-disable-next-line linebreak-style

export const ClienteDto = Prisma.validator<Prisma.ClienteSelect>()({
  id: true,
  name: true,
  status: true,
  phone: true,
  imageUrl: true,
  endereco: true,
});
