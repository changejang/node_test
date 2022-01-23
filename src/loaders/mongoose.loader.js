import mongoose from 'mongoose';
import { databaseURL } from '../config';
import { logger } from '../lib';

mongoose.Promise = global.Promise;

class DBLoader {
  async connect() {
    try {
      await mongoose.connect(databaseURL);
      logger.info('DB Connected!');
    } catch (error) {
      logger.error(error);
    }
  }
}

export default DBLoader;
