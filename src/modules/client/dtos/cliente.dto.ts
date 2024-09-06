import { Prisma } from '@prisma/client';

export const ClienteDto = Prisma.validator<Prisma.ClienteSelect>()({
  id: true,
  name: true,
  status: true,
  phone: true,
  imageUrl: true,
  endereco: true,
});
