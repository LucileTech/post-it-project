const { Schema, model } = require("mongoose");

const todoSchema = new Schema(
  {
    title: {
      type: String,
    },
    content: {
      type: [String],
    },
    status: {
      type: Boolean,
    },
    color: {
      type: String,
    },
    user: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Todo = model("Todo", todoSchema);

module.exports = Todo;
