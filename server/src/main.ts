import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { AuthController, AuthService } from './auth';
import { initializeConfigs } from './configs';
import { initializeFirebase } from './firebase';
import { GroupController, GroupRepo, GroupService } from './groups';
import { MessageController, MessageRepo, MessageService } from './messages';
import { connectMongo } from './mongoose';
import { initializeRedis } from './redis';
import { UserRepo } from './users';

(async () => {
  const app = express();
  const httpServer = createServer(app);
  const io = new Server(httpServer);

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
  app.get('/healthcheck', (_req, res) => {
    res.json({msg: `Hello world!!!`})
  })
  AuthController.register(app, authService);
  GroupController.register(app, groupService, firebase, redis, userRepo);
  MessageController.register(app, messageService, firebase, redis, userRepo);


  io.on("connection", (socket) => {
    console.log(`New connection. Socket ID: ${socket.id}`);
  });

  httpServer.listen(configs.port, () => {
    console.log(`Server listening on port ${configs.port}`);
  });
})();