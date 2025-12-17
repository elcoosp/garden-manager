import AsyncStorage from '@react-native-async-storage/async-storage';

export const TokenStorage = {
  getAccessToken: async (): Promise<string | null> => {
    try {
      return await AsyncStorage.getItem('accessToken');
    } catch {
      return null;
    }
  },

  setAccessToken: async (token: string): Promise<void> => {
    try {
      await AsyncStorage.setItem('accessToken', token);
    } catch (error) {
      console.error('Error saving token:', error);
    }
  },

  getRefreshToken: async (): Promise<string | null> => {
    try {
      return await AsyncStorage.getItem('refreshToken');
    } catch {
      return null;
    }
  },

  setRefreshToken: async (token: string): Promise<void> => {
    try {
      await AsyncStorage.setItem('refreshToken', token);
    } catch (error) {
      console.error('Error saving refresh token:', error);
    }
  },

  clearTokens: async (): Promise<void> => {
    try {
      await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);
    } catch (error) {
      console.error('Error clearing tokens:', error);
    }
  },
};
