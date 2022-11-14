const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo.model");

router.get("/todos", async (req, res, next) => {
  try {
    const allTodos = await Todo.find();
    console.log(allTodos);
    res.render("todo/alltodoview", {
      allTodos,
      style: ["todostyle.css", "style.css"],
    });
  } catch (error) {
    next(error);
  }
});

/* POST todo page */

router.get("/todos/create", (req, res, next) => {
  try {
    res.render("todo/createtodoview", { style: ["style.css"] });
  } catch (error) {
    next(error);
  }
});

router.post("/todos/create", async (req, res, next) => {
  try {
    const { title, content } = req.body;
    await Todo.create({ title, content });
    res.redirect("/todos");
  } catch (error) {
    next(error);
  }
});

router.get("/todos/:id", async (req, res, next) => {
  try {
    const oneTodo = await Todo.findById(req.params.id);
    console.log(req.params.id);
    res.render("todo/onetodoview", {
      oneTodo,
      style: ["todostyle.css", "style.css"],
    });
  } catch (error) {
    next(error);
  }
});

// Update route to do entière
router.post("/todos/:id", (res, req, next) => {
  try {
    res.redirect("/todos");
  } catch (error) {
    next(error);
  }
});

// Delete route to do entière
router.post("/todos/:id", (res, req, next) => {
  try {
    res.redirect("/todos");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
