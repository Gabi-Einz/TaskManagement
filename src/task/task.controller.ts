import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './models/Task';
import { JwtAuthGuard } from 'src/auth/jwt/guards/jwt-auth.guard';
import { RequestWithUser } from 'src/auth/models/RequestWithUser';
import { TaskCreationRequest } from './models/task-creation.request';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Req() req: RequestWithUser): Promise<Task[]> {
    return await this.taskService.findAllByUser(req.user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() taskCreationRequest: TaskCreationRequest,
    @Req() req: RequestWithUser,
  ) {
    return this.taskService.create(taskCreationRequest, req.user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.findOneById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: TaskCreationRequest,
  ) {
    return this.taskService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Req() req: RequestWithUser) {
    return this.taskService.remove(id, req);
  }
}
