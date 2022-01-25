export default class CommentController {
  service = null;

  constructor(Service, model) {
    this.service = new Service(model);
  }

  async find(req, res, next) {
    const { boardId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const result = await this.service.find({ boardId }, page, limit);
    return result;
  }

  async create(req, res, next) {
    const { boardId, commentId } = req.params;
    const { body } = req;
    const result = await this.service.create(body, boardId, commentId);
    return result;
  }
}
