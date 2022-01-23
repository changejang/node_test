import mongoose from 'mongoose';
import ShortUniqueId from 'short-unique-id';

const { ObjectId, Schema, model } = mongoose;

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
      type: ObjectId,
      ref: 'Board',
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

export default model('Comment', Comment);
