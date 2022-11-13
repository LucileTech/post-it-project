const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo.model");

/* POST todo page */

router.post("/todo/newtodo", async (req, res, next) => {
  try {
    const { title, content } = req.body;
    await Todo.create({ title, content });
    // res.redirect("/todo/");
  } catch (error) {
    next(error);
  }
});

router.get("/todos", async (req, res, next) => {
  try {
    const allTodos = await Todo.find();
    console.log(allTodos);
    res.render("todo/alltodoview", { allTodos });
  } catch (error) {
    next(error);
  }
});

router.get("/todo/:id", async (req, res, next) => {
  try {
    const myTodo = await Todo.findById(req.params.id);
    console.log(req.params.id);
    res.render("todo/todoview", {
      myTodo,
      style: ["todostyle.css"],
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
