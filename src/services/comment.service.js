import argon2 from 'argon2';
import { logger } from '../lib/index.js';

export default class CommentService {
  model = null;

  constructor(model) {
    this.model = model;
  }

  async create(body, boardId, commentId = null) {
    const { content, author } = body;
    const result = this.model.create({
      content,
      author,
      boardId,
      parentId: commentId,
    });
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
}
