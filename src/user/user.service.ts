import { Injectable } from '@nestjs/common';
import { User } from './models/User';

@Injectable()
export class UserService {
  private readonly users = [
    new User(1, 'pepe', 'klasjkldjk'),
    new User(2, 'rodolfo', 'qweqwe'),
    new User(3, 'admin', '123'),
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.name === username);
  }
}
