import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ITaskRepository } from 'src/shared/interfaces/ITaskRepository';
import { Task } from './models/Task';
import { TaskCreationRequest } from './models/task-creation.request';
import { RequestWithUser } from 'src/auth/models/RequestWithUser';
import { Role } from 'src/auth/authorization/enums/role.enum';

@Injectable()
export class TaskService {
  constructor(
    @Inject('ITaskRepository') private iTaskRepository: ITaskRepository<Task>,
  ) {}

  async findAllByUser(userId: number): Promise<Task[]> {
    return await this.iTaskRepository.findAllByUserId(userId);
  }

  async findOneByIdAndUserId(taskId: number, userId: number) {
    const task = await this.iTaskRepository.findOneByIdAndUserId(
      taskId,
      userId,
    );
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  async create(createTaskDto: TaskCreationRequest, userId: number) {
    const data = {
      ...createTaskDto,
      userId,
    };
    return await this.iTaskRepository.create(data);
  }

  async update(taskId: number, dto: TaskCreationRequest, userId: number) {
    const task = await this.findOneByIdAndUserId(taskId, userId);
    Object.assign(task, dto);
    task.updatedAt = new Date();
    return await this.iTaskRepository.updateById(taskId, task);
  }

  async remove(id: number, req: RequestWithUser) {
    const { user } = req;
    const task = await this.iTaskRepository.findOneById(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    if (task.userId !== user.sub && user.role !== Role.ADMIN) {
      throw new ForbiddenException('Not allowed to delete this task');
    }
    return this.iTaskRepository.deleteById(id);
  }
}
