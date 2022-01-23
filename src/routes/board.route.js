import { Router } from 'express';
import { asyncWrapper } from '../lib';

export default class BoardRoute {
  router = Router();

  controller = null;

  constructor(Controller, Service, model) {
    this.controller = new Controller(Service, model);
    this.initializeRouter();
  }

  getController() {
    return this.controller;
  }

  initializeRouter() {
    const router = Router();
    const path = '/board';
    router.get('/', asyncWrapper(this.boardList.bind(this)));
    // .get('/:boardId', asyncWrapper(this.findOrder))
    // .post('/', asyncWrapper(this.register))
    // .delete('/:taskId', asyncWrapper(this.deleteOrderById));
    this.router.use(path, router);
  }

  async boardList(req, res) {
    await this.controller.find();
    res.send('sc');
  }
}
