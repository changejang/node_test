export default class BoardRoute {
  constructor(Controller, Service, model) {
    this.controller = new Controller(Service, model);
  }
}
