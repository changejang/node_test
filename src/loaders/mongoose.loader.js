import mongoose from "mongoose";
import { databaseURL } from "../config";
import { logger } from "../lib";

mongoose.Promise = global.Promise;

const mongooseConnection = async () => {
  logger.info("Mongoose loader!");
  try {
    await mongoose.connect(databaseURL);
  } catch (error) {
    logger.error(error);
  }
};

export default mongooseConnection;
