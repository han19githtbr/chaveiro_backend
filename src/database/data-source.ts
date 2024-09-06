import { PrismaClient } from '@prisma/client';
// eslint-disable-next-line linebreak-style

// Design pattern Singleton.
class DataSource {
  private static db?: PrismaClient;

  // The singleton's constructor should always be private to prevent direct construction calls with the `new` operator.
  private constructor() {}

  public static getInstance(): PrismaClient {
    if (!DataSource.db) {
      DataSource.db = new PrismaClient({ errorFormat: 'minimal' });
    }

    return DataSource.db;
  }
}

export default DataSource.getInstance();
