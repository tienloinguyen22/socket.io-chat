import { Document } from 'mongoose';
import { UserID } from '../users';
import { IsAuditable } from '../utils';

export type GroupID = string;

export interface Group extends IsAuditable, Document {
  _id: string;
  name: string;
  members: UserID[];
}