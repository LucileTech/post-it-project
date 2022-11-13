const { Schema, model } = require("mongoose");

const todoSchema = new Schema(
  {
    title: {
      type: String,
    },
    content: [
      {
        task: String,
        status: { type: Boolean, default: false },
      },
    ],
    color: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Todo = model("Todo", todoSchema);

module.exports = Todo;
