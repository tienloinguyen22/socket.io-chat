import { Document } from 'mongoose';
import { IsAuditable } from '../utils';

export interface User extends IsAuditable, Document {
  _id: string;
  fullName: string;
  email: string;
  firebaseId: string;
  isActive: boolean;
}