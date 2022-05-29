import axios from 'axios';

const apiConfigs = {
  baseUrl: 'http://localhost:3001',
};

const authenticate = async (payload: { idToken: string }) => {
  const { data } = await axios.post(`${apiConfigs.baseUrl}/auth`, payload);
  return data;
};

export const apiService = {
  authenticate,
};