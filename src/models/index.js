import { logger } from "../lib";
import board from "./board.model.js";
import comment from "./comment.model.js";

class Model {
  constructor(model) {
    this.model = model;
  }

  create() {}

  findById() {}

  find() {}

  updateById() {}

  deleteById() {}
}

const boardModel = new Model(board);
const userModel = new Model(user);

export default {
  taskModel,
  userModel,
};
