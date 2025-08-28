import { CreateUserUseCase } from '@/application/use-cases/create-user.usecase';
import { GetUsersUseCase } from '@/application/use-cases/get-users.usecase';
import { CreateUserRequest } from '@/presentation/dto/request/create-user.request';
import { UserResponse } from '@/presentation/dto/response/user.response';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUsersUseCase: GetUsersUseCase,
  ) {}

  @Post()
  async create(@Body() body: CreateUserRequest): Promise<UserResponse> {
    const user = await this.createUserUseCase.execute(body);
    return UserResponse.fromEntity(user);
  }

  @Get()
  async findAll(): Promise<UserResponse[]> {
    const users = await this.getUsersUseCase.execute();
    return UserResponse.fromEntityList(users);
  }
}
