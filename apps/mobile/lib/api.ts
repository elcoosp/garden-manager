// api.ts
import { OpenAPIClientAxios } from 'openapi-client-axios';
import type { Client } from './openapi.d.ts';
import { TokenStorage } from '@/lib/token-storage';

const api = new OpenAPIClientAxios({
  definition: './swagger-spec.json',
  withServer: {
    url: "https://urethroscopic-earnestine-unburnished.ngrok-free.dev/api/"
  }
});

export const updateApiToken = async (authResponse: {
  accessToken: string;
  refreshToken: string;
}) => {
  await TokenStorage.setAccessToken(authResponse.accessToken);
  await TokenStorage.setRefreshToken(authResponse.refreshToken);
};

export const getApiClient = async () => {
  const client = await api.getClient<Client>();

  const accessToken = await TokenStorage.getAccessToken();
  if (accessToken) {
    client.defaults.headers['authorization'] = `Bearer ${accessToken}`;
  }

  return client;
};

export const clearAuthTokens = async () => {
  await TokenStorage.clearTokens();
};
