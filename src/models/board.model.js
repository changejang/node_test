import mongoose from "mongoose";
import ShortUniqueId from "short-unique-id";

const { Schema, model } = mongoose;
const createShortId = new ShortUniqueId({ length: 5 });

const Board = new Schema(
  {
    boardId: {
      type: String,
    },
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    author: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

Board.pre("save", function save(next) {
  const boardId = createShortId();
  this.set({ boardId });
  next();
});

export default model("Board", Board);
