import { BadRequestException, keyword } from '../lib/index.js';

export default class CommentService {
  model = null;

  constructor(model) {
    this.model = model;
  }

  async create(body, boardId, commentId = null) {
    const { content, author } = body;
    if (!boardId) throw new BadRequestException('BoardId를 확인해 주세요');
    const result = await this.model.create({
      content,
      author,
      boardId,
      parentId: commentId,
    });
    if (result?.commentId) await keyword.search(content);
    return result;
  }

  async find(query, page, limit) {
    const result = await this.model.find(query, page, limit);
    return result;
  }

  async findById(boardId) {
    const result = await this.model.findById({ boardId });
    return result;
  }
}
