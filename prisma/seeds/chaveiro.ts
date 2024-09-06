import { Prisma, PrismaClient, ChaveiroStatus } from '@prisma/client';


const chaveiros: Prisma.ChaveiroCreateInput[] = [
  {
    name: 'Marcos',
    phone: '999992999',
    imageUrl: 'https://c.pxhere.com/photos/27/4c/photo-93779.jpg!d',
    endereco: 'Rua A, 123',
    status: ChaveiroStatus.disponivel,
  },
  {
    name: 'André',
    phone: '997992929',
    imageUrl: 'https://images4.alphacoders.com/115/thumb-1920-115716.jpg',
    endereco: 'Rua C, 417',
    status: ChaveiroStatus.indisponivel,
  },
  {
    name: 'Camilo',
    phone: '991932991',
    imageUrl: 'https://images4.alphacoders.com/115/thumb-1920-115716.jpg',
    endereco: 'Rua E, 235',
    status: ChaveiroStatus.disponivel,
  },
  {
    name: 'Tiago',
    phone: '991037911',
    imageUrl: 'https://images4.alphacoders.com/115/thumb-1920-115716.jpg',
    endereco: 'Rua F, 255',
    status: ChaveiroStatus.indisponivel,
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
