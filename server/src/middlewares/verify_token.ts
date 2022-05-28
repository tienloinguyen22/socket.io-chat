import admin from 'firebase-admin';
import Redis from 'ioredis';
import { UserRepo } from '../users';

export const verifyToken = (firebase: admin.app.App, redis: Redis, userRepo: UserRepo) => {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return async (req, _res, next: Function) => {
    try {
      const bearerToken = req.get('Authorization');
      if (bearerToken) {
        const token = bearerToken.replace('Bearer ', '');
        const cached = await redis.get(token);
        if (cached) {
          (req as any).ctx = {
            user: JSON.parse(cached),
          };
        } else {
          const verifyIdToken = await firebase.auth().verifyIdToken(token);
          const user = await userRepo.findByFirebaseId(verifyIdToken.uid);
          await redis.set(token, JSON.stringify(user));
          await redis.expire(token, 3600); // 3600s
          (req as any).ctx = {
            user,
          };
        }
      }
      next();
    } catch (error) {
      console.log('Verify token error: ', error);
      next();
    }
  };
};
