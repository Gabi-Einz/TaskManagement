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
  HttpCode,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './models/Task';
import { JwtAuthGuard } from 'src/auth/authentication/jwt/guards/jwt-auth.guard';
import { RequestWithUser } from 'src/auth/models/RequestWithUser';
import { TaskCreationRequest } from './models/task-creation.request';
import { RolesGuard } from 'src/auth/authorization/guards/role.guard';
import { Roles } from 'src/auth/authorization/decorators/role.decorator';
import { Role } from 'src/auth/authorization/enums/role.enum';
import { HttpStatusCode } from 'src/shared/enums/http-status-code.enum';
import { MessageResponse } from './models/message.response';
import { SkipThrottle } from '@nestjs/throttler';

@SkipThrottle()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  @HttpCode(HttpStatusCode.OK)
  @Roles([Role.ADMIN, Role.USER])
  async findAll(@Req() req: RequestWithUser): Promise<Task[]> {
    return await this.taskService.findAllByUser(req.user.sub);
  }

  @Get('populate')
  @HttpCode(HttpStatusCode.OK)
  @Roles([Role.ADMIN, Role.USER])
  async findAndCreatePopulateTasks(): Promise<MessageResponse> {
    return await this.taskService.findAndCreatePopulateTasks();
  }

  @Post()
  @HttpCode(HttpStatusCode.CREATED)
  @Roles([Role.ADMIN, Role.USER])
  async create(
    @Body() taskCreationRequest: TaskCreationRequest,
    @Req() req: RequestWithUser,
  ) {
    return await this.taskService.create(taskCreationRequest, req.user.sub);
  }

  @Get(':id')
  @HttpCode(HttpStatusCode.OK)
  @Roles([Role.ADMIN, Role.USER])
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: RequestWithUser,
  ) {
    return await this.taskService.findOneByIdAndUserId(id, req.user.sub);
  }

  @Patch(':id')
  @HttpCode(HttpStatusCode.NO_CONTENT)
  @Roles([Role.ADMIN, Role.USER])
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: TaskCreationRequest,
    @Req() req: RequestWithUser,
  ) {
    await this.taskService.update(id, dto, req.user.sub);
    return {};
  }

  @Delete(':id')
  @HttpCode(HttpStatusCode.NO_CONTENT)
  @Roles([Role.ADMIN, Role.USER])
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: RequestWithUser,
  ) {
    await this.taskService.remove(id, req);
    return {};
  }
}
