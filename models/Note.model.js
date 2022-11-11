const { Schema, model } = require("mongoose");

const noteSchema = new Schema(
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

const Note = model("Note", noteSchema);

module.exports = Note;
