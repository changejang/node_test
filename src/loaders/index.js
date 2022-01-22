import expressLoader from "./express.loader";
import mongooseLoader from "./mongoose.loader";
import { logger } from "../lib";

const load = async ({ expressApp }) => {
  logger.info("DB");
  await expressLoader({ app: expressApp });
  await mongooseLoader();
  logger.info("Express loaded");
};

export default load;
