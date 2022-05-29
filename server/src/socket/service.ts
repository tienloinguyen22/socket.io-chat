import { Server, Socket } from 'socket.io';
import { GroupRepo } from '../groups';

export class SocketService {
  public io: Server;
  public socket: Socket;
  public groupRepo: GroupRepo;

  constructor(io: Server, socket: Socket, groupRepo: GroupRepo) {
    this.io = io;
    this.socket = socket;
    this.groupRepo = groupRepo;
  }

  public async joinRooms(): Promise<void> {
    // TODO
  }
}