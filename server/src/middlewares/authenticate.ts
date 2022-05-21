import { StatusCodes } from 'http-status-codes';
import _ from 'lodash';
import { ApiError } from '../utils';

export const authenticate = () => {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return (req, _res, next: Function) => {
    if (!_.get(req, 'user._id')) {
      throw new ApiError('Not authenticated', StatusCodes.FORBIDDEN);
    } else {
      next();
    }
  };
};