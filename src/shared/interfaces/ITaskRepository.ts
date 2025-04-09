export interface ITaskRepository<T> {
  create(data: Partial<T>): Promise<T>;
  updateById(id: number, data: Partial<T>): Promise<T>;
  deleteById(id: number): Promise<T>;
  findOneById(id: number): Promise<T | null>;
  findAllByUserId(userId: number): Promise<T[]>;
}
