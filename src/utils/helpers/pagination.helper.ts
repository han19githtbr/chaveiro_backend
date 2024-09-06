import { IPagination } from '@interfaces/pagination.interface';
// eslint-disable-next-line linebreak-style

class PaginationHelper {
  public paginate(data: [any[], number], size: number, page: number): IPagination<any> {
    const [rows, count] = data;
    return {
      data: rows,
      totalItems: count,
      totalPages: Math.ceil(count / size),
      itemsPerPage: size,
      page: page,
    };
  }
}

export default new PaginationHelper();
