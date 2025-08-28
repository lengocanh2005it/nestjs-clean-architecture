import { BadRequestException } from '@nestjs/common';

export class Email {
  constructor(public readonly value: string) {
    const trimmed = value.trim();
    if (!this.isValid(trimmed)) throw new BadRequestException('Invalid email');
    this.value = trimmed;
  }

  private isValid(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  equals(other: Email): boolean {
    return this.value === other.value;
  }
}
