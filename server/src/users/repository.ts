import mongoose from 'mongoose';
import { addAuditableSchema } from '../utils';
import { User } from './types';

const UserSchema = new mongoose.Schema(
  addAuditableSchema({
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    firebaseId: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  }),
);

export class UserRepo {
  private model: mongoose.Model<User, any, any, any>;

  constructor() {
    this.model = mongoose.model<User>('users', UserSchema);
  }

  public async findById(id: string): Promise<User | null> {
    return this.model.findById(id);
  }

  public async findByEmail(email: string): Promise<User | null> {
    return this.model.findOne({ email });
  }

  public async findByFirebaseId(firebaseId: string): Promise<User | null> {
    return this.model.findOne({ firebaseId });
  }

  public async create(payload: Partial<User>): Promise<User> {
    const result = await this.model.create(payload);
    return result.toObject();
  }

  public async update(id: string, payload: Partial<User>): Promise<User> {
   return this.model
    .findByIdAndUpdate(id, { $set: payload }, { new: true })
    .lean();
  }
}
