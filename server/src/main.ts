import express from "express";
import { createServer } from "http";
import bodyParser from 'body-parser';
import cors from 'cors';
import { AuthController, AuthService } from './auth';
import { initializeConfigs } from './configs';
import { initializeFirebase } from './firebase';
import { GroupController, GroupRepo, GroupService } from './groups';
import { MessageController, MessageRepo, MessageService } from './messages';
import { connectMongo } from './mongoose';
import { initializeRedis } from './redis';
import { initializeSocket } from './socket';
import { UserRepo } from './users';

(async () => {
  const app = express();
  const httpServer = createServer(app);

  // Configs
  const configs = initializeConfigs();

  // Mongo
  await connectMongo(configs);

  // Redis
  const redis = initializeRedis(configs);

  // Firebase
  const firebase = initializeFirebase(configs);

  // Repository
  const userRepo = new UserRepo();
  const groupRepo = new GroupRepo();
  const messageRepo = new MessageRepo();

  // Service
  const authService = new AuthService(firebase, userRepo);
  const groupService = new GroupService(groupRepo);
  const messageService = new MessageService(messageRepo);

  // Controller
  app.use(bodyParser.json());
  app.use(cors());
  app.get('/healthcheck', (_req, res) => {
    res.json({msg: `Hello world!!!`})
  })
  AuthController.register(app, authService);
  GroupController.register(app, groupService, firebase, redis, userRepo);
  MessageController.register(app, messageService, firebase, redis, userRepo);

  // Socket
  const io = initializeSocket(configs, httpServer, redis, firebase, userRepo);
  io.on("connection", async (socket) => {
    console.log(`New connection. Socket ID: ${socket.id}`);

    // Joins all rooms: All groups + User own room
    const { ctx } = socket.request as any;
    const userId = ctx.user._id;
    const userGroups = await groupRepo.findAllByMemberId(userId);
    const rooms = [
      `users.${String(userId)}`,
      ...userGroups.map((group) => `groups.${String(group._id)}`)
    ]
    rooms.forEach((room) => (io.of('/').adapter as any).remoteJoin(socket.id, room))

    // Handle events
    socket.on('hello', (...args) => {
      console.log('🚀 ~ file: main.ts ~ line 70 ~ socket.on ~ args', args);
    });
  });

  httpServer.listen(configs.port, () => {
    console.log(`Server listening on port ${configs.port}`);
  });
})();