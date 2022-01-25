import { Router } from 'express';
import { asyncWrapper } from '../lib';

export default class BoardRoute {
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
      .get('/', asyncWrapper(this.controller.find.bind(this.controller)))
      .post('/', asyncWrapper(this.controller.create.bind(this.controller)))
      .put(
        '/:boardId',
        asyncWrapper(this.controller.update.bind(this.controller)),
      )
      .delete(
        '/:boardId',
        asyncWrapper(this.controller.delete.bind(this.controller)),
      )
      .get(
        '/search',
        asyncWrapper(this.controller.search.bind(this.controller)),
      );
    this.router.use(path, router);
  }
}
