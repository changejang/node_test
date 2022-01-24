import { KeywordModel, keywordSchema } from '../models';
import { logger } from './logger.lib.js';

class Keyword {
  model = null;

  constructor() {
    this.model = new KeywordModel(keywordSchema);
    this.init();
  }

  async init() {
    // Test용 데이터 생성
    await this.model.deleteMany({});
    await this.model.create({
      users: ['kim', 'jang'],
      keyword: 'jang',
    });
  }

  async find() {
    const result = await this.model.find({});
    return result;
  }

  async search(content) {
    const keywords = await this.find();
    keywords.forEach((data) => {
      const { keyword, users } = data;
      const regex = new RegExp(keyword);
      const matched = content.match(regex);
      if (matched && matched.length > 0) this.push(keyword, users);
    });
  }

  push(keyword, users) {
    logger.info(`Keyword: ${keyword}, Users: ${users}`);
  }
}

const keyword = new Keyword();

export { keyword };
