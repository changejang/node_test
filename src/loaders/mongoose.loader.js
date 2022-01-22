import mongoose from "mongoose";
import { databaseURL } from "../config";
import { logger } from "../lib";

mongoose.Promise = global.Promise;

class DBLoader {
  // eslint-disable-next-line class-methods-use-this
  async connect() {
    logger.info("Mongoose loader!");
    try {
      await mongoose.connect(databaseURL);
    } catch (error) {
      logger.error(error);
    }
  }
}

export default DBLoader;
