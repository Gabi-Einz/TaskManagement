import { Injectable } from '@nestjs/common';
import { PrismaClient, Task } from '@prisma/client';
import { ITaskRepository } from '../../shared/interfaces/ITaskRepository';

@Injectable()
export class TaskRepository implements ITaskRepository<Task> {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(data: Omit<Task, 'id'>): Promise<Task> {
    return this.prisma.task.create({
      data,
    });
  }

  async findAllByUserId(userId: number): Promise<Task[]> {
    return this.prisma.task.findMany({
      where: { userId },
    });
  }

  async findOneById(id: number): Promise<Task | null> {
    return this.prisma.task.findUnique({
      where: { id },
    });
  }

  async updateById(id: number, data: Partial<Omit<Task, 'id'>>): Promise<Task> {
    return this.prisma.task.update({
      where: { id },
      data,
    });
  }

  async deleteById(id: number): Promise<Task> {
    return this.prisma.task.delete({
      where: { id },
    });
  }
}
