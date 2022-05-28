import mongoose from 'mongoose';
import { addAuditableSchema } from '../utils';
import { Group } from './types';

const GroupSchema = new mongoose.Schema(
  addAuditableSchema({
    name: {
      type: String,
      required: true,
    },
    members: {
      type: [String],
      default: [],
    },
  }),
);

export class GroupRepo {
  private model: mongoose.Model<Group, any, any, any>;

  constructor() {
    this.model = mongoose.model<Group>('groups', GroupSchema);
  }

  public async findById(id: string): Promise<Group | null> {
    return this.model.findById(id).lean();
  }

  public async findAllByMemberId(memberId: string): Promise<Group[]> {
    return this.model.find({ members: memberId }).lean();
  }

  public async create(payload: Partial<Group>): Promise<Group> {
    const result = await this.model.create(payload);
    return result.toObject();
  }

  public async update(id: string, payload: Partial<Group>): Promise<Group> {
    return this.model
      .findByIdAndUpdate(id, { $set: payload }, { new: true })
      .lean();
  }
}
