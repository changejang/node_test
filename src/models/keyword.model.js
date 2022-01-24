import mongoose from 'mongoose';
import ShortUniqueId from 'short-unique-id';
import commonModel from './model.js';

const { Schema, model } = mongoose;
const createShortId = new ShortUniqueId({ length: 5 });

const Keyword = new Schema(
  {
    keywordId: {
      type: String,
    },
    keyword: {
      type: String,
    },
    users: {
      type: [],
    },
  },
  {
    timestamps: true,
  },
);
Keyword.pre('save', function save(next) {
  const keywordId = createShortId();
  this.set({ keywordId });
  next();
});

export class KeywordModel extends commonModel {
  model = null;

  constructor(keywordModel) {
    super(model);
    this.model = keywordModel;
  }

  async deleteMany(query) {
    const result = await this.model.deleteMany(query);
    return result;
  }
}

export const keywordSchema = model('Keyword', Keyword);
