import argon2 from 'argon2';
import { logger, keyword } from '../lib';

export default class BoardService {
  model = null;

  constructor(model) {
    this.model = model;
  }

  async create(body) {
    const { title, content, author, password } = body;
    const hashedPassword = await argon2.hash(password);
    const result = await this.model.create({
      title,
      content,
      author,
      password: hashedPassword,
    });
    if (result?.boardId) await keyword.search(content);
    return result;
  }

  async find(query, page, limit) {
    const result = await this.model.find(query, page, limit);
    logger.info(result);
    return result;
  }

  async findById(boardId) {
    const result = await this.model.findById({ boardId });
    return result;
  }

  async delete(boardId, pw) {
    const board = await this.model.findById({ boardId });
    // if (!board) error
    const { password: hashedPassword } = board;
    const is = await argon2.verify(hashedPassword, pw);
    let result;
    if (is) result = await this.model.delete({ boardId });
    return result;
  }

  async update(body, boardId) {
    const result = await this.model.update({ boardId }, body);
    return result;
  }
}
