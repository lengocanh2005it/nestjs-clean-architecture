import { User } from '@/core/entities/user.entity';
import {
  Exclude,
  Expose,
  instanceToPlain,
  plainToInstance,
} from 'class-transformer';

export class UserResponse {
  @Expose() readonly id!: string;
  @Expose() readonly email!: string;
  @Exclude() readonly password?: string;

  static fromEntity(user: User) {
    const plainUser = instanceToPlain(user) as any;
    if (plainUser.email?.value) {
      plainUser.email = plainUser.email.value;
    }
    return plainToInstance(UserResponse, plainUser, {
      excludeExtraneousValues: true,
    });
  }

  static fromEntityList(users: User[]): UserResponse[] {
    return users.map((user) => UserResponse.fromEntity(user));
  }
}
