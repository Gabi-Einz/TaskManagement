import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TokenResponse } from './models/TokenResponse';
import { TokenRequest } from './models/TokenRequest';
import { RefreshTokenRequest } from './models/RefreshTokenRequest';
import { RefreshTokenResponse } from './models/RefreshTokenResponse';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async createToken(@Body() request: TokenRequest): Promise<TokenResponse> {
    const { userName, password } = request;
    return await this.authService.createToken(userName, password);
  }
  @Post('refresh')
  async refreshToken(
    @Body() request: RefreshTokenRequest,
  ): Promise<RefreshTokenResponse> {
    return await this.authService.refreshToken(request.refreshToken);
  }
}
