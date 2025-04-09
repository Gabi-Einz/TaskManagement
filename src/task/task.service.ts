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

@Injectable()
export class TaskService {
  constructor(
    @Inject('ITaskRepository') private iTaskRepository: ITaskRepository<Task>,
  ) {}

  async findAllByUser(userId: number): Promise<Task[]> {
    return await this.iTaskRepository.findAllByUserId(userId);
  }

  async findOneById(taskId: number) {
    const task = await this.iTaskRepository.findOneById(taskId);
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

  async update(taskId: number, dto: TaskCreationRequest) {
    const task = await this.findOneById(taskId);
    Object.assign(task, dto);
    task.updatedAt = new Date();
    return await this.iTaskRepository.updateById(taskId, task);
  }

  async remove(id: number, req: RequestWithUser) {
    // const task = await this.iTaskRepository.findOneById({
    //   where: { id },
    //   relations: ['owner'],
    // });
    const { user } = req;
    const task = await this.iTaskRepository.findOneById(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    if (task.userId !== user.sub /*&& user.role !== 'admin'*/) {
      throw new ForbiddenException('Not allowed to delete this task');
    }
    return this.iTaskRepository.deleteById(id);
  }
}
