const express = require("express");
const router = express.Router();
const Note = require("../models/Note.model");

router.get("/notes", (req, res, next) => {
  try {
    res.render("notes/allnotesview", { style: ["style.css"] });
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

router.post("/notes/create", (res, req, next) => {
  try {
    res.redirect("/notes");
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
router.post("/notes/:id", (res, req, next) => {
  try {
    res.redirect("/notes");
  } catch (error) {
    next(error);
  }
});

// Delete route
router.post("/notes/:id", (res, req, next) => {
  try {
    res.redirect("/notes");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
