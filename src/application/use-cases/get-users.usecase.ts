import { IUserRepository } from '@/core/interfaces/repositories/user.repository.interface';
import { USER_REPOSITORY } from '@/shared/constants/token';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class GetUsersUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute() {
    return this.userRepository.findAll();
  }
}
