import { Server } from 'socket.io';
import { GroupRepo } from '../groups';
import { User, UserRepo } from '../users';
import { Context } from '../utils';

export class SocketService {
  private io: Server;
  private userRepo: UserRepo;
  private groupRepo: GroupRepo;

  constructor(io: Server, userRepo: UserRepo, groupRepo: GroupRepo) {
    this.io = io;
    this.userRepo = userRepo;
    this.groupRepo = groupRepo;
  }

  public async joinRooms(ctx: Context): Promise<void> {
    const socketId = ctx.socketId;
    const userId = ctx.user._id;
    const userGroups = await this.groupRepo.findAllByMemberId(userId);
    const rooms = [
      `users.${String(userId)}`,
      ...userGroups.map((group) => `groups.${String(group._id)}`)
    ]
    rooms.forEach((room) => (this.io.of('/').adapter as any).remoteJoin(socketId, room))
  }

  public async getConversations(ctx: Context): Promise<User[]> {
    return this.userRepo.findAllExcepIds([ctx.user._id]);
  }
}