import { Inject, Injectable } from '@nestjs/common';
import { User } from './models/User';
import { IOrmRepository } from 'src/shared/interfaces/IOrmRepository';

@Injectable()
export class UserService {
  constructor(
    @Inject('IOrmRepository') private iOrmRepository: IOrmRepository<User>,
  ) {}

  async findOne(username: string): Promise<User | null> {
    return await this.iOrmRepository.findByName(username);
  }
}
