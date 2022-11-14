const express = require("express");
const { findByIdAndUpdate } = require("../models/Todo.model");
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
    res.render("todo/createtodoview", {
      style: ["style.css"],
    });
  } catch (error) {
    next(error);
  }
});

router.post("/todos/create", async (req, res, next) => {
  try {
    const { title, task } = req.body;
    const newToDo = await Todo.create({ title, content: [] });
    // res.redirect("/todos");
    res.json(newToDo);
  } catch (error) {
    next(error);
  }
});

router.post("/todos/:id/tasks/add", async (req, res, next) => {
  try {
    console.log(req.body);
    let newTask = req.body;
    await Todo.findByIdAndUpdate(req.params.id, {
      $push: { content: req.body },
    });
    res.json(newTask);
    // const { title, task } = req.body;
    // const newToDo = await Todo.create({ title, content: [] });
    // // res.redirect("/todos");
    // res.json(newToDo);
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
router.post("/todos/:id", (req, res, next) => {
  try {
    res.redirect("/todos");
  } catch (error) {
    next(error);
  }
});

// Delete route to do entière
router.post("/todos/:id", (req, res, next) => {
  try {
    res.redirect("/todos");
  } catch (error) {
    next(error);
  }
});

// router.post("/todos/title", (req, res, next) => {
//   try {
//     const todoTitle = await Todo.findById(req.params.id);
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = router;
