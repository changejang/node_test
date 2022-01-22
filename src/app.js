import { ExpressLoader, DBLoader } from "./loaders";

const start = async () => {
  const dbLoader = new DBLoader();
  await dbLoader().connect();

  const app = new ExpressLoader();

  app.listen();
};

await start();
