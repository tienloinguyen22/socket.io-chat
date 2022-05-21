import { StatusCodes } from 'http-status-codes';
import { Context } from 'vm';
import { UserID } from '../users';
import { addCreationInfo, addModificationInfo, ApiError } from '../utils';
import { GroupRepo } from './repository';
import { Group } from './types';

export class GroupService {
  private groupRepo: GroupRepo;

  constructor(groupRepo: GroupRepo) {
    this.groupRepo = groupRepo;
  }

  public async create(ctx: Context, payload: { name: string; members: UserID[] }): Promise<Group> {
    if (!payload.name) {
      throw new ApiError('Group name is required', StatusCodes.BAD_REQUEST);
    }
    if (!payload.members || payload.members.length === 0) {
      throw new ApiError('Group members is required', StatusCodes.BAD_REQUEST);
    }

    return this.groupRepo.create({
      name: payload.name,
      members: payload.members,
      ...addCreationInfo(ctx),
      ...addModificationInfo(ctx),
    });
  }

  public async update(ctx: Context, id: string, payload: { name: string }): Promise<Group> {
    if (!payload.name) {
      throw new ApiError('Group name is required', StatusCodes.BAD_REQUEST);
    }

    const existedGroup = await this.groupRepo.findById(id);
    if (!existedGroup) {
      throw new ApiError(`Group ${id} not found`, StatusCodes.NOT_FOUND);
    }

    return this.groupRepo.update(existedGroup._id, {
      name: payload.name,
      ...addModificationInfo(ctx),
    });
  }

  public async addMembers(ctx: Context, id: string, payload: { members: UserID[] }): Promise<Group> {
    if (!payload.members || payload.members.length === 0) {
      throw new ApiError('Group members is required', StatusCodes.BAD_REQUEST);
    }

    const existedGroup = await this.groupRepo.findById(id);
    if (!existedGroup) {
      throw new ApiError(`Group ${id} not found`, StatusCodes.NOT_FOUND);
    }

    const newGroupMembers = Array.from(new Set([...existedGroup.members, ...payload.members]));
    return this.groupRepo.update(existedGroup._id, {
      members: newGroupMembers,
      ...addModificationInfo(ctx),
    });
  }


  public async removeMembers(ctx: Context, id: string, payload: { members: UserID[] }): Promise<Group> {
    if (!payload.members || payload.members.length === 0) {
      throw new ApiError('Group members is required', StatusCodes.BAD_REQUEST);
    }

    const existedGroup = await this.groupRepo.findById(id);
    if (!existedGroup) {
      throw new ApiError(`Group ${id} not found`, StatusCodes.NOT_FOUND);
    }

    const newGroupMembers = existedGroup.members.filter((userId) => !payload.members.includes(userId));
    if (newGroupMembers.length === 0) {
      throw new ApiError(`Can't remove all members from group`, StatusCodes.BAD_REQUEST);
    }

    return this.groupRepo.update(existedGroup._id, {
      members: newGroupMembers,
      ...addModificationInfo(ctx),
    });
  }
}