import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './models/User';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  async getByUserName(userName: string): Promise<User | undefined> {
    return this.userService.findOne(userName);
  }
}
