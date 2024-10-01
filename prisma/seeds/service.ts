import { Prisma, PrismaClient, ServiceStatus, ServiceType } from '@prisma/client';


const services: Prisma.ServicoCreateInput[] = [
  {
    cliente: 'Camilo',
    value: '20',
    imageUrl: 'https://img.lovepik.com/element/40048/2624.png_1200.png',
    service: ServiceType.copia,
    status: ServiceStatus.ativo,
  },
  {
    cliente: 'André',
    value: '20',
    imageUrl: 'https://static.vecteezy.com/system/resources/previews/019/907/697/original/key-graphic-clipart-design-free-png.png',
    service: ServiceType.copia,
    status: ServiceStatus.ativo,
  },
  {
    cliente: 'Mateus',
    value: '30',
    imageUrl: 'https://wallpapercave.com/wp/wp4140261.jpg',
    service: ServiceType.conserto,
    status: ServiceStatus.ativo,
  },
  {
    cliente: 'Tiago',
    value: '20',
    imageUrl: 'https://www.goodfreephotos.com/albums/other-photos/keys.jpg',
    service: ServiceType.copia,
    status: ServiceStatus.ativo,
  },
];

export async function seedService(prisma: PrismaClient): Promise<void> {
  for (const service of services) {
    await prisma.servico.create({
      data: service,
    });
  }

  console.log('Service seed OK.', services);
}
