import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AuthService } from './service';

export class AuthController {
  static register(router: Router, authService: AuthService): void {
    router.post("/auth", async (req, res) => {
      try {
        const result = await authService.authenticate(req.body);
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