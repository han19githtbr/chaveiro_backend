// eslint-disable-next-line linebreak-style
export interface IPagination<T> {
  data: T[];
  totalItems: number;
  totalPages: number;
  itemsPerPage: number;
  page: number;
}
