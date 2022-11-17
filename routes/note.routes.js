const express = require("express");
const router = express.Router();
const Note = require("../models/Note.model");
const Todo = require("../models/Todo.model");

const isLoggedIn = require("../middleware/isLoggedIn");

// List all notes
router.get("/notes", isLoggedIn, async (req, res, next) => {
  try {
    const allNotes = await Note.find({ user: req.session.currentUser._id });
    const allTodos = await Todo.find({ user: req.session.currentUser._id });
    console.log(allNotes);
    res.render("notes/allnotesview", {
      allNotes,
      allTodos,
      style: ["style.css", "listnotestyle.css"],
    });
  } catch (error) {
    next(error);
  }
});

// Create a note
router.get("/notes/create", isLoggedIn, async (req, res, next) => {
  try {
    const allNotes = await Note.find({ user: req.session.currentUser._id });
    const allTodos = await Todo.find({ user: req.session.currentUser._id });
    res.render("notes/createnoteview", {
      allNotes,
      allTodos,
      style: ["style.css", "createnotestyle.css"],
    });
  } catch (error) {
    next(error);
  }
});

router.post("/notes/create", async (req, res, next) => {
  try {
    const { title, content, user } = req.body;
    console.log(
      await Note.create({ title, content, user: req.session.currentUser._id })
    );
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

// Find note by ID
router.get("/notes/:id", isLoggedIn, async (req, res, next) => {
  try {
    const allNotes = await Note.find({ user: req.session.currentUser._id });
    const allTodos = await Todo.find({ user: req.session.currentUser._id });
    const oneNote = await Note.findById(req.params.id);
    res.render("notes/onenoteview", {
      allNotes,
      allTodos,
      oneNote,
      style: ["style.css", "onenotestyle.css"],
    });
  } catch (error) {
    next(error);
  }
});

// Update route
router.post("/notes/:id/update", async (req, res, next) => {
  try {
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    console.log(updatedNote);
    // res.redirect("/notes");
  } catch (error) {
    next(error);
  }
});

// Delete route
router.post("/notes/:id/delete", async (req, res, next) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.redirect("/notes");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
