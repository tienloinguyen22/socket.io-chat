import _ from 'lodash';
import moment from 'moment';
import { Context, IsAuditable } from './types';

export const addCreationInfo = (ctx: Context): Partial<IsAuditable> => {
  const userId = _.get(ctx, 'user._id');
  return {
    createdBy: userId || '',
    createdAt: moment().valueOf(),
  };
};
