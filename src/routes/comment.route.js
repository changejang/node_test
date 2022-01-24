import { Router } from 'express';
import { asyncWrapper } from '../lib';

export default class CommentRoute {
  router = Router();

  controller = null;

  constructor(Controller, Service, model) {
    this.controller = new Controller(Service, model);
    this.initializeRouter();
  }

  initializeRouter() {
    const router = Router();
    const path = '/board';
    router
      .get(
        '/:boardId/comment',
        asyncWrapper(this.controller.find.bind(this.controller)),
      )
      .post(
        '/:boardId/comment',
        asyncWrapper(this.controller.create.bind(this.controller)),
      )
      .post(
        '/:boardId/comment/:commentId',
        asyncWrapper(this.controller.create.bind(this.controller)),
      );
    this.router.use(path, router);
  }
}
