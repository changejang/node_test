import dotenv from 'dotenv';

process.env.NODE_ENV = (process.env.NODE_ENV || 'sample').toLowerCase();

const evnFound = dotenv.config({
  path: `.${process.env.NODE_ENV}.env`,
});

const { NODE_ENV, PORT, MONGODB_URI } = process.env;

if (evnFound.error) {
  throw new Error("Couldn't find .env file");
}

const port = parseInt(PORT, 10) || 3000;
const nodeEnv = NODE_ENV;
const databaseURL = MONGODB_URI;

const api = {
  prefix: '/api',
};

export { port, nodeEnv, databaseURL, api };
