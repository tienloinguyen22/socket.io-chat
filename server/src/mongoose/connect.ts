import mongoose from 'mongoose';
import { Configs } from '../configs';

export const connectMongo = async (configs: Configs): Promise<void> => {
  await mongoose.connect(configs.databaseURL);
};