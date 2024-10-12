import { Prisma, PrismaClient, ClienteStatus } from '@prisma/client';


const clientes: Prisma.ClienteCreateInput[] = [
  {
    name: 'Julio',
    phone: '992992999',
    imageUrl: 'https://c.pxhere.com/photos/be/0e/photo-16530.jpg!d',
    endereco: 'Rua A, 123',
    service: 'Cópia',
    status: ClienteStatus.servido,
  },
  {
    name: 'Rafael',
    phone: '997992929',
    imageUrl: 'https://c.pxhere.com/photos/27/4c/photo-93779.jpg!d',
    endereco: 'Rua C, 417',
    service: 'Conserto',
    status: ClienteStatus.pendente,
  },
  {
    name: 'Marina',
    phone: '991932991',
    imageUrl: 'http://3.bp.blogspot.com/-UqZql7ObRh4/Th91bNhwlLI/AAAAAAAAFPg/I-menEHLw1w/s512/DSC_0755.JPG',
    endereco: 'Rua E, 235',
    service: 'Cópia',
    status: ClienteStatus.servido,
  },
  {
    name: 'Luiza',
    phone: '991932991',
    imageUrl: 'https://imagens.mdig.com.br/beleza/mulher_pais_ia_08.jpg',
    endereco: 'Rua E, 235',
    service: 'Conserto',
    status: ClienteStatus.servido,
  },
  {
    name: 'Handy',
    phone: '991932991',
    imageUrl: 'https://media.licdn.com/dms/image/v2/D4E03AQEJ7nKnJjCyhA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1689894320271?e=1730937600&v=beta&t=kIMHrNZOBUSm6vzyFQ6z8stX8dsF1Hiaq2GWnAcaiwY',
    endereco: 'Niteroi - RJ',
    service: 'Cópia',
    status: ClienteStatus.servido,
  },
];

export async function seedCliente(prisma: PrismaClient): Promise<void> {
  for (const cliente of clientes) {
    await prisma.cliente.create({
      data: cliente,
    });
  }

  console.log('Cliente seed OK.');
}
