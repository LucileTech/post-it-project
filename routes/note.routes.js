const express = require("express");
const router = express.Router();
const Note = require("../models/Note.model");
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/notes", isLoggedIn, async (req, res, next) => {
  try {
    const allNotes = await Note.find({ user: req.session.currentUser._id });
    console.log(allNotes);
    res.render("notes/allnotesview", {
      allNotes,
      style: ["style.css", "listnotestyle.css"],
    });
  } catch (error) {
    next(error);
  }
});

router.get("/notes/create", isLoggedIn, (req, res, next) => {
  try {
    res.render("notes/createnoteview", { style: ["style.css"] });
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

router.get("/notes/:id", isLoggedIn, async (req, res, next) => {
  try {
    const oneNote = await Note.findById(req.params.id);
    res.render("notes/onenoteview", {
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
    res.redirect("/notes");
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
