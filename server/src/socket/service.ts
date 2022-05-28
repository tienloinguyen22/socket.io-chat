import { Server, Socket } from 'socket.io';
import { GroupRepo } from '../groups';

export class SocketService {
  private io: Server;
  private socket: Socket;
  private groupRepo: GroupRepo;

  constructor(io: Server, socket: Socket, groupRepo: GroupRepo) {
    this.io = io;
    this.socket = socket;
    this.groupRepo = groupRepo;
  }

  public async joinRooms(): Promise<void> {
    // TODO
  }
}