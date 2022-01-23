export default class BoardController {
  constructor(Service, model) {
    this.service = new Service(model);
  }
}
