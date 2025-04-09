import { Injectable, UnauthorizedException } from '@nestjs/common';
import { TokenResponse } from './models/TokenResponse';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenResponse } from './models/RefreshTokenResponse';
import { Payload } from './models/Payload';

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
    const user = await this.userService.findOneByName(userName);
    if (password != user?.password) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.name, role: user.role };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRE_IN,
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRE_IN,
    });
    return TokenResponse.build(accessToken, refreshToken);
  }

  async refreshToken(refreshToken: string): Promise<RefreshTokenResponse> {
    try {
      const payload: Payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });

      const newAccessToken = this.jwtService.sign(
        {
          sub: payload.sub,
          username: payload.username,
          role: payload.role,
        } as Payload,
        {
          secret: process.env.JWT_ACCESS_SECRET,
          expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRE_IN,
        },
      );
      return RefreshTokenResponse.build(newAccessToken);
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException('invalid refresh token');
    }
  }
}
