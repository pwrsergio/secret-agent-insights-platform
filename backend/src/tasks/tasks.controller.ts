import { Controller, Get, Post, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getTasks(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @Post()
  createTask(@Body('title') title: string): Promise<Task> {
    return this.tasksService.create(title);
  }
}
