import dotenv from 'dotenv';

export type Configs = {
  port: number;
  mongoURL: string;
  redisURL: string;
  firebase: {
    projectId: string;
    clientEmail: string;
    privateKey: string;
  },
  socket: {
    maxConnections: number;
  },
}

export const initializeConfigs = (): Configs => {
  process.env.NODE_ENV = process.env.NODE_ENV || 'development';
  const envFound = dotenv.config();
  if (envFound.error) {
    throw new Error("Couldn't find .env file");
  }

  return {
    port: parseInt(process.env.PORT || '3000', 10),
    mongoURL: process.env.MONGODB_URL || '',
    redisURL: process.env.REDIS_URL || '',
    firebase: {
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY,
    },
    socket: {
      maxConnections: parseInt(process.env.SOCKET_MAX_CONNECTIONS || '5000', 10),
    },
  };
};
