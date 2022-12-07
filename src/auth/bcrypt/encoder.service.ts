import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptEncoderService {
  /**
   * It generates a random salt, then hashes the password using that salt
   * @param {string} password - The password to hash.
   * @returns A promise that resolves to a string.
   */
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  /**
   * It takes a password and a hashed password, and returns a promise that resolves to true if the
   * password matches the hashed password, and false otherwise
   * @param {string} password - The password that the user entered.
   * @param {string} hashedPassword - The hashed password that was stored in the database.
   * @returns A promise that resolves to a boolean.
   */
  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
