import { Server } from 'socket.io';
import { SocketService } from './service';

export class SocketController {
  static register(io: Server, socketService: SocketService): void {
    io.on("connection", async (socket) => {
      console.log(`New connection. Socket ID: ${socket.id}`);
      const { ctx } = socket.request as any;

      // Joins all rooms: All groups + User own room
      await socketService.joinRooms(ctx);
    
      // Handle events
      socket.on('getConversations', async (callback) => {
        try {
          const conversations = await socketService.getConversations(ctx);
          callback({
            success: true,
            data: conversations,
          });
        } catch (error) {
          console.log('Error: ', error);
          callback({
            success: false,
            message: error.message || 'Internal server error'
          });
        }
      });
    });
  }
}