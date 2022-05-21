import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { AuthController, AuthService } from './auth';
import { initializeConfigs } from './configs';
import { initializeFirebase } from './firebase';
import { connectMongo } from './mongoose';
import { UserRepo } from './users';

(async () => {
  const app = express();
  const httpServer = createServer(app);
  const io = new Server(httpServer);

  // Configs
  const configs = initializeConfigs();

  // Mongo
  await connectMongo(configs);

  // Firebase
  const firebase = initializeFirebase(configs);

  // Repository
  const userRepo = new UserRepo();

  // Service
  const authService = new AuthService(firebase, userRepo);

  // Controller
  app.get('/healthcheck', (_req, res) => {
    res.json({msg: `Hello world!!!`})
  })
  AuthController.register(app, authService);

  io.on("connection", (socket) => {
    console.log(`New connection. Socket ID: ${socket.id}`);
  });

  httpServer.listen(configs.port, () => {
    console.log(`Server listening on port ${configs.port}`);
  });
})();