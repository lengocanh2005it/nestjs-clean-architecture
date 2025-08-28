import { CreateUserUseCase } from '@/application/use-cases/create-user.usecase';
import { GetUsersUseCase } from '@/application/use-cases/get-users.usecase';
import { UserOrmEntity } from '@/infrastructure/database/entities/user.orm-entity';
import { UserRepositoryImpl } from '@/infrastructure/database/repositories/user.repository.impl';
import { PasswordHasherServiceImpl } from '@/infrastructure/services/password-hasher.service.impl';
import { UserController } from '@/presentation/controllers/user.controller';
import { PASSWORD_HASHER, USER_REPOSITORY } from '@/shared/constants/token';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserOrmEntity])],
  controllers: [UserController],
  providers: [
    UserRepositoryImpl,
    PasswordHasherServiceImpl,
    CreateUserUseCase,
    GetUsersUseCase,
    {
      provide: USER_REPOSITORY,
      useClass: UserRepositoryImpl,
    },
    {
      provide: PASSWORD_HASHER,
      useClass: PasswordHasherServiceImpl,
    },
  ],
})
export class UserModule {}
