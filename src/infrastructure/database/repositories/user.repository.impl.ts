import { User } from '@/core/entities/user.entity';
import { IUserRepository } from '@/core/interfaces/repositories/user.repository.interface';
import { Email } from '@/core/value-objects/email.vo';
import { UserOrmEntity } from '@/infrastructure/database/entities/user.orm-entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepositoryImpl implements IUserRepository {
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly repo: Repository<UserOrmEntity>,
  ) {}

  async save(user: User): Promise<User> {
    const ormUser = this.repo.create({
      id: user.id,
      email: user.email.value,
      password: user.password,
    });
    const saved = await this.repo.save(ormUser);
    return new User(saved.id, new Email(saved.email), saved.password);
  }

  async findByEmail(email: string): Promise<User | null> {
    const ormUser = await this.repo.findOne({ where: { email } });
    return ormUser
      ? new User(ormUser.id, new Email(ormUser.email), ormUser.password)
      : null;
  }

  async findAll(): Promise<User[]> {
    const ormUsers = await this.repo.find();
    return ormUsers.map((ou) => {
      return new User(ou.id, new Email(ou.email), ou.password);
    });
  }
}
