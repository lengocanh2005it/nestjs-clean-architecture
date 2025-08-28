import { CreateUserDto } from '@/application/dto/create-user.dto';
import { User } from '@/core/entities/user.entity';
import { IUserRepository } from '@/core/interfaces/repositories/user.repository.interface';
import { IPasswordHasherService } from '@/core/interfaces/services/password-hasher.service.interface';
import { Email } from '@/core/value-objects/email.vo';
import { PASSWORD_HASHER, USER_REPOSITORY } from '@/shared/constants/token';
import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(PASSWORD_HASHER)
    private readonly passwordHasherService: IPasswordHasherService,
  ) {}

  async execute(input: CreateUserDto): Promise<User> {
    const { email, password } = input;

    const exists = await this.userRepository.findByEmail(email);
    if (exists) throw new ConflictException('Email already registered');

    const hashed = await this.passwordHasherService.hash(password);
    const user = new User(uuid(), new Email(input.email), hashed);
    return this.userRepository.save(user);
  }
}
