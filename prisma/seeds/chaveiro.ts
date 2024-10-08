import { Prisma, PrismaClient, ChaveiroStatus } from '@prisma/client';


const chaveiros: Prisma.ChaveiroCreateInput[] = [
  {
    name: 'Marcos',
    phone: '+5521921932790',
    imageUrl: 'https://c.pxhere.com/photos/27/4c/photo-93779.jpg!d',
    endereco: 'Rua A, 123',
    status: ChaveiroStatus.ativo,
  },
  {
    name: 'André',
    phone: '+5521921032090',
    imageUrl: 'https://images4.alphacoders.com/115/thumb-1920-115716.jpg',
    endereco: 'Rua C, 417',
    status: ChaveiroStatus.inativo,
  },
  {
    name: 'Camilo',
    phone: '+5521921992730',
    imageUrl: 'https://images4.alphacoders.com/115/thumb-1920-115716.jpg',
    endereco: 'Rua E, 235',
    status: ChaveiroStatus.ativo,
  },
  {
    name: 'Tiago',
    phone: '+5521991912700',
    imageUrl: 'https://images4.alphacoders.com/115/thumb-1920-115716.jpg',
    endereco: 'Rua F, 255',
    status: ChaveiroStatus.inativo,
  },
];

export async function seedChaveiro(prisma: PrismaClient): Promise<void> {
  for (const chaveiro of chaveiros) {
    await prisma.chaveiro.create({
      data: chaveiro,
    });
  }

  console.log('Chaveiro seed OK.');
}
