export class TokenResponse {
  accessToken: string;
  static build = (accessToken: string) => {
    const tokenResponse = new TokenResponse();
    tokenResponse.accessToken = accessToken;
    return tokenResponse;
  };
}
