// eslint-disable-next-line linebreak-style
import { Prisma } from '@prisma/client';
// eslint-disable-next-line linebreak-style

export const ServicoDto = Prisma.validator<Prisma.ServicoSelect>()({
  id: true,
  cliente: true,
  value: true,
  service: true,
  status: true,
  imageUrl: true,
});
