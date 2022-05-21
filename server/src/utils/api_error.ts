import { StatusCodes } from 'http-status-codes';

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message || 'Internal server error');
    this.status = status || StatusCodes.INTERNAL_SERVER_ERROR;
  }
}
