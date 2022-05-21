import { Document } from 'mongoose';
import { GroupID } from '../groups';
import { UserID } from '../users';
import { IsAuditable } from '../utils';

export enum ReceiverType {
  USER = 'USER',
  GROUP = 'GROUP',
}

export interface Message extends IsAuditable, Document {
  _id: string;
  body: string;
  sender: UserID;
  receiver: UserID | GroupID;
  receiverType: ReceiverType;
}