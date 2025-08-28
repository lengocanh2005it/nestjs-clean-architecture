import { Email } from '@/core/value-objects/email.vo';

export class User {
  constructor(
    public readonly id: string,
    public email: Email,
    public password: string,
  ) {}
}
