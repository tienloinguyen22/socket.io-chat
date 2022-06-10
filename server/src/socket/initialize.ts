import { IncomingMessage, Server as HttpServer } from 'http';
import { Server } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import admin from 'firebase-admin';
import { Configs } from '../configs';
import Redis from 'ioredis';
import { User, UserRepo } from '../users';
import { StatusCodes } from 'http-status-codes';

export const initializeSocket = (configs: Configs, httpServer: HttpServer, redis: Redis, firebase: admin.app.App, userRepo: UserRepo): Server => {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE"]
    },
    pingInterval: 25000,
    cookie: false,
    serveClient: false,
    allowRequest: async (req: IncomingMessage, callback: (err: string | null | undefined, success: boolean) => void) => {
      console.log('Authorize socket initialization');
      try {
        const token = req.headers.authorization;
        if (!token) {
          const err = `Authorization headers not found`;
          console.log(`Socket request unauthorized: ${err}`);
          callback(err, false);
        } else {
          const cached = await redis.get(token);
          if (cached) {
            console.log('Cached found');
            const user: User = JSON.parse(cached);
            (req as any).ctx = {
              user,
              socketId: `${user._id}.${Math.round(Math.random() * 1e5)}`
            };
          } else {
            console.log('Cached not found');
            const verifyIdToken = await firebase.auth().verifyIdToken(token);
            const user = await userRepo.findByFirebaseId(verifyIdToken.uid);
            if (!user) {
              throw new Error(`User not found for firebaseId: ${verifyIdToken.uid}`)
            }

            await redis.set(token, JSON.stringify(user));
            await redis.expire(token, 3600); // 3600s
            (req as any).ctx = {
              user,
              socketId: `${user._id}.${Math.round(Math.random() * 1e5)}`
            };
          }
          callback(undefined, true);
        }
      } catch (err) {
        console.log(`Socket request validation error: ${err}`);
        callback(err.message, false);
      }
    },
  });

  // Overwrite socket.id
  io.use((socket, next) => {
    const { ctx } = socket.request as any;
    if (!ctx || !ctx.user || !ctx.user._id) {
      const err = new Error('No context attached to request');
      console.log(`Error generating socket.id ${err}`)
      next(err);
    }
    (socket as any).id = ctx.socketId;
    next();
  });

  // Limit connections count
  io.use((socket, next) => {
    if (io.engine.clientsCount > configs.socket.maxConnections) {
      socket.emit('event', {
        code: StatusCodes.TEMPORARY_REDIRECT,
        message: 'Find another server',
      })
    }
    next()
  });

  const pubClient = redis;
  const subClient = pubClient.duplicate();
  const redisAdapter = createAdapter(pubClient, subClient);
  io.adapter(redisAdapter);

  return io;
};