import { DBLoader } from './loaders';
import { BoardRoute, CommentRoute } from './routes';
import { BoardController, CommentController } from './controllers';
import { BoardService, CommentService } from './services';
import { BoardModel, boardSchema, CommentModel, commentSchema } from './models';
import ExpressLoader from './loaders/express.loader.js';

const start = async () => {
  const dbLoader = new DBLoader();
  await dbLoader.connect();
  const app = new ExpressLoader([
    new BoardRoute(BoardController, BoardService, new BoardModel(boardSchema)),
    new CommentRoute(
      CommentController,
      CommentService,
      new CommentModel(commentSchema),
    ),
  ]);
  app.listen();
};

await start();
