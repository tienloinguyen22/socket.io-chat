import admin from 'firebase-admin';
import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import Redis from 'ioredis';
import { authenticate, verifyToken } from '../middlewares';
import { UserRepo } from '../users';
import { GroupService } from './service';

export class GroupController {
  static register(
    router: Router,
    groupService: GroupService,
    firebase: admin.app.App,
    redis: Redis,
    userRepo: UserRepo,
  ): void {
    router.post("/groups", verifyToken(firebase, redis, userRepo), authenticate(), async (req, res) => {
      try {
        const result = await groupService.create((req as any).ctx, req.body);
        res.status(StatusCodes.OK).json(result);
      } catch (error) {
        console.log('Error: ', error);
        res
          .status(error.status || StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: error.message || 'Internal server error' });
      }
    });

    router.put("/groups/:id", verifyToken(firebase, redis, userRepo), authenticate(), async (req, res) => {
      try {
        const result = await groupService.update((req as any).ctx, req.params.id, req.body);
        res.status(StatusCodes.OK).json(result);
      } catch (error) {
        console.log('Error: ', error);
        res
          .status(error.status || StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: error.message || 'Internal server error' });
      }
    });

    router.put("/groups/:id/add-members", verifyToken(firebase, redis, userRepo), authenticate(), async (req, res) => {
      try {
        const result = await groupService.addMembers((req as any).ctx, req.params.id, req.body);
        res.status(StatusCodes.OK).json(result);
      } catch (error) {
        console.log('Error: ', error);
        res
          .status(error.status || StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: error.message || 'Internal server error' });
      }
    });

    router.put("/groups/:id/remove-members", verifyToken(firebase, redis, userRepo), authenticate(), async (req, res) => {
      try {
        const result = await groupService.removeMembers((req as any).ctx, req.params.id, req.body);
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