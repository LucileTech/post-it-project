const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middleware/isLoggedIn");
const Todo = require("../models/Todo.model");
const Note = require("../models/Note.model");

/* GET home page */
router.get("/filecreation", isLoggedIn, async (req, res, next) => {
  try {
    const allTodos = await Todo.find({ user: req.session.currentUser._id });
    const allNotes = await Note.find({ user: req.session.currentUser._id });
    res.render("filecreation", {
      allTodos,
      allNotes,
      style: ["style.css", "filecreationstyle.css"],
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
