import mongoose from 'mongoose';
import { addAuditableSchema } from '../utils';
import { Message, ReceiverType } from './types';

const MessageSchema = new mongoose.Schema(
  addAuditableSchema({
    body: {
      type: String,
      required: true,
    },
    sender: {
      type: String,
      required: true,
    },
    receiver: {
      type: String,
      required: true,
    },
    receiverType: {
      type: String,
      required: true,
      enum: [ReceiverType.USER, ReceiverType.GROUP],
    },
  }),
);

export class MessageRepo {
  private model: mongoose.Model<Message, any, any, any>;

  constructor() {
    this.model = mongoose.model<Message>('messages', MessageSchema);
  }

  public async findById(id: string): Promise<Message | null> {
    return this.model.findById(id).lean();
  }

  public async create(payload: Partial<Message>): Promise<Message> {
    const result = await this.model.create(payload);
    return result.toObject();
  }
}
