import { IPasswordHasherService } from '@/core/interfaces/services/password-hasher.service.interface';
import { Injectable } from '@nestjs/common';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class PasswordHasherServiceImpl implements IPasswordHasherService {
  async hash(password: string): Promise<string> {
    return bcryptjs.hash(password, bcryptjs.genSaltSync());
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return bcryptjs.compare(password, hash);
  }
}
