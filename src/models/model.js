export default class Model {
  model = null;

  constructor(model) {
    this.model = model;
  }

  async create(body) {
    const result = await this.model.create(body);
    return result;
  }

  async findById(query) {
    const result = await this.model.findOne(query);
    return result;
  }

  async find(query, page, limit) {
    const result = await this.model
      .find(query, null, {
        skip: (page - 1) * limit,
        limit,
      })
      .select('-password');
    return result;
  }

  async update(query, body) {
    const result = await this.model.findOneAndUpdate(query, body);
    return result;
  }

  async delete(query) {
    const result = await this.model.deleteOne(query);
    return result;
  }

  async search(query) {}
}
