import { Injectable, UnauthorizedException } from '@nestjs/common';
import { TokenResponse } from './models/TokenResponse';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}
  async createToken(
    userName: string,
    password: string,
  ): Promise<TokenResponse> {
    const user = await this.userService.findOne(userName);
    if (password != user?.password) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.name };
    const accessToken = await this.jwtService.signAsync(payload);
    return TokenResponse.build(accessToken);
  }
}
