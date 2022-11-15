const { Schema, model } = require("mongoose");

const noteSchema = new Schema(
  {
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    //:color: {
    // type: String,
    //},
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Note = model("Note", noteSchema);

module.exports = Note;
