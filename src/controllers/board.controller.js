import { BadRequestException } from '../lib/index.js';

export default class BoardController {
  service = null;

  constructor(Service, model) {
    this.service = new Service(model);
  }

  async find(req, res, next) {
    const { page = 1, limit = 10 } = req.query;
    const result = await this.service.find({}, page, limit);
    return result;
  }

  async create(req, res, next) {
    const { body } = req;
    const result = await this.service.create(body);
    return result;
  }

  async delete(req, res, next) {
    const { boardId } = req.params;
    const { body } = req;
    const { password } = body;
    if (!boardId) throw new BadRequestException('BoardId를 확인해 주세요');
    const result = await this.service.delete(boardId, password);
    return result;
  }

  async update(req, res, next) {
    const { boardId } = req.params;
    if (!boardId) throw new BadRequestException('BoardId를 확인해 주세요');
    const result = await this.service.update(req.body, boardId);
    return result;
  }

  async search(req, res, next) {
    const { keyword } = req.query;
    const query = new RegExp(keyword);
    const result = await this.service.find(
      {
        $or: [{ title: query }, { author: query }],
      },
      1,
      10,
    );
    return result;
  }
}
