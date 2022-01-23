export default class CommentController {
  constructor(Service, model) {
    this.service = new Service(model);
  }
}
