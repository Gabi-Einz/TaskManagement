export interface IUserRepository<T> {
  create(data: Partial<T>): Promise<T>;
  updateById(id: number, data: Partial<T>): Promise<T>;
  deleteById(id: number): Promise<T>;
  findById(id: number): Promise<T | null>;
  findAll(): Promise<T[]>;
  findByName(name: string): Promise<T | null>;
}
