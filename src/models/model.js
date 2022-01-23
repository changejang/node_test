export default class Model {
  model = null;

  constructor(model) {
    this.model = model;
  }

  create() {}

  findById() {}

  async find() {
    const result = await this.model.find({}).exec();
    return result;
  }

  updateById() {}

  deleteById() {}
}
