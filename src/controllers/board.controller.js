export default class BoardController {
  service = null;

  constructor(Service, model) {
    this.service = new Service(model);
  }

  async find() {
    await this.service.find();
  }
}
