const express = require("express");
const router = express.Router();
const Note = require("../models/Note.model");

router.get("/notes", async (req, res, next) => {
  try {
    const allNotes = await Note.find();
    console.log(allNotes);
    res.render("notes/allnotesview", {
      allNotes,
      style: ["style.css", "listnotestyle.css"],
    });
  } catch (error) {
    next(error);
  }
});

router.get("/notes/create", (req, res, next) => {
  try {
    res.render("notes/createnoteview", { style: ["style.css"] });
  } catch (error) {
    next(error);
  }
});

router.post("/notes/create", async (req, res, next) => {
  try {
    const { title, content } = req.body;
    console.log(await Note.create({ title, content }));
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

router.get("/notes/:id", async (req, res, next) => {
  try {
    const oneNote = await Note.findById(req.params.id);
    res.render("notes/onenoteview", { oneNote, style: ["style.css"] });
  } catch (error) {
    next(error);
  }
});

// Update route
router.post("/notes/:id", (req, res, next) => {
  try {
    res.redirect("/notes");
  } catch (error) {
    next(error);
  }
});

// Delete route
router.post("/notes/:id", (req, res, next) => {
  try {
    res.redirect("/notes");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
