const { Schema, model } = require("mongoose");

const todoSchema = new Schema(
  {
    Titre: {
      type: String,
      required: false,
      unique: true,
      trim: true,
    },
    Contenu: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  }
);

const Todo = model("Todo", todoSchema);

module.exports = Todo;
