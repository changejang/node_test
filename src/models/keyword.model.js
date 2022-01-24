import mongoose from 'mongoose';
import ShortUniqueId from 'short-unique-id';
import commonModel from './model.js';

const { Schema, model, ObjectId } = mongoose;
const createShortId = new ShortUniqueId({ length: 5 });

const Keyword = new Schema(
  {
    keywordId: {
      type: String,
    },
    content: {
      type: String,
    },
    author: {
      type: String,
    },
    boardId: {
      type: ObjectId,
      ref: 'Board',
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
}

export const keywordSchema = model('Keyword', Keyword);
