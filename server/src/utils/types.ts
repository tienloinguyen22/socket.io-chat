import { User } from '../users';

export type TimestampInMilliseconds = number;

export interface IsAuditable {
  createdBy?: string;
  createdAt?: TimestampInMilliseconds;
  updatedBy?: string;
  updatedAt?: TimestampInMilliseconds;
}

export interface Context {
  user?: User;
  socketId?: string;
}