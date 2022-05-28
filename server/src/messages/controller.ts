import { Router } from 'express';
import admin from 'firebase-admin';
import Redis from 'ioredis';
import { MessageService } from './service';
import { UserRepo } from '../users';
import { authenticate, verifyToken } from '../middlewares';
import { StatusCodes } from 'http-status-codes';

export class MessageController {
  static register(
    router: Router,
    MessageService: MessageService,
    firebase: admin.app.App,
    redis: Redis,
    userRepo: UserRepo,
  ): void {
    router.post("/messages", verifyToken(firebase, redis, userRepo), authenticate(), async (req, res) => {
      try {
        const result = await MessageService.send((req as any).ctx, req.body);
        res.status(StatusCodes.OK).json(result);
      } catch (error) {
        console.log('Error: ', error);
        res
          .status(error.status || StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: error.message || 'Internal server error' });
      }
    });
  }
}