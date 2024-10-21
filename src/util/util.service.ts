import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UtilService {
  async generateRandomPassword(length: number) {
    let result: string = '';

    const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    const charactersLength: number = characters.length;

    let counter: number = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  async generateRandomSalt(rounds: number) {
    const salt = await bcrypt.genSalt(rounds);

    return salt;
  }

  async hashPassword(password: string, salt: string) {
    const hash = await bcrypt.hash(password, salt);

    return hash;
  }

  async comparePassword(password: string, hash: string) {
    const match = await bcrypt.compare(password, hash);

    return match;
  }
}
