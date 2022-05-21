import _ from 'lodash';
import moment from 'moment';
import { Context, IsAuditable } from './types';

export const addModificationInfo = (ctx: Context): Partial<IsAuditable> => {
  const userId = _.get(ctx, 'user._id');
  return {
    updatedBy: userId || '',
    updatedAt: moment().valueOf(),
  };
};
