export default class BoardService {
  model = null;

  constructor(model) {
    this.model = model;
  }

  async find() {
    logger.info(await this.model.find());
  }
}
