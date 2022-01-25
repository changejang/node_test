import mongoose from 'mongoose';
import ShortUniqueId from 'short-unique-id';
import commonModel from './model.js';

const { Schema, model } = mongoose;
const createShortId = new ShortUniqueId({ length: 5 });

const Comment = new Schema(
  {
    commentId: {
      type: String,
    },
    content: {
      type: String,
    },
    author: {
      type: String,
    },
    boardId: {
      type: String,
    },
    parentId: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);
Comment.pre('save', function save(next) {
  const commentId = createShortId();
  this.set({ commentId });
  next();
});

export class CommentModel extends commonModel {
  model = null;

  constructor(boardModel) {
    super(model);
    this.model = boardModel;
  }
}

export const commentSchema = model('Comment', Comment);
