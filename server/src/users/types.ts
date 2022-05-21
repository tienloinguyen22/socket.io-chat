import { Document } from 'mongoose';
import { IsAuditable } from '../utils';

export type UserID = string;

export interface User extends IsAuditable, Document {
  _id: string;
  fullName: string;
  email: string;
  firebaseId: string;
  isActive: boolean;
}