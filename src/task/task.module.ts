import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TaskRepository } from './repositories/TaskRepository';
import { TaskApiRepository } from './repositories/task-api.repository';

@Module({
  controllers: [TaskController],
  providers: [
    TaskService,
    {
      provide: 'ITaskRepository',
      useClass: TaskRepository,
    },
    {
      provide: 'ITaskApiRepository',
      useClass: TaskApiRepository,
    },
  ],
})
export class TaskModule {}
