import { ExpressLoader, DBLoader } from './loaders';
import { BoardRoute, CommentRoute } from './routes';
import { BoardController, CommentController } from './controllers';
import { BoardService, CommentService } from './services';
import { boardModel, commentModel } from './models';

const start = async () => {
  const dbLoader = new DBLoader();
  await dbLoader.connect();

  const app = new ExpressLoader([
    new BoardRoute(BoardController, BoardService, boardModel),
    new CommentRoute(CommentController, CommentService, commentModel),
  ]);
  app.listen();
};

await start();
