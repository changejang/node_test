import { Router } from 'express';

export default class CommentRoute {
  router = Router();

  #service = null;

  controller = null;

  constructor(Controller, Service, model) {
    this.controller = new Controller(Service, model);
  }

  router() {}
}
