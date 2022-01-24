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
    // if (!boardId)
    //   throw new BadRequestException('유저 정보가 정확하지 않습니다.');
    const result = await this.service.delete(boardId, password);
    return result;
  }

  async update(req, res, next) {
    const { boardId } = req.params;
    // if (!boardId)
    //   throw new BadRequestException('유저 정보가 정확하지 않습니다.');
    const result = await this.service.update(req.body, boardId);
    return result;
  }
}
