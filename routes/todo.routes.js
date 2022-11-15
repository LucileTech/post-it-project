const express = require("express");
const { findByIdAndUpdate } = require("../models/Todo.model");
const router = express.Router();
const Todo = require("../models/Todo.model");
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/todos", isLoggedIn, async (req, res, next) => {
  try {
    const allTodos = await Todo.find({ user: req.session.currentUser._id });
    let userName = req.session.currentUser.name;
    console.log(userName);
    console.log(allTodos);
    res.render("todo/alltodoview", {
      allTodos,
      style: ["listtodostyle.css", "style.css"],
    });
  } catch (error) {
    next(error);
  }
});

/* POST todo page */

router.get("/todos/create", isLoggedIn, (req, res, next) => {
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
    const { title, task, user } = req.body;
    const newToDo = await Todo.create({
      title,
      content: [],
      user: req.session.currentUser._id,
    });
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

router.get("/todos/:id", isLoggedIn, async (req, res, next) => {
  try {
    const oneTodo = await Todo.findById(req.params.id);
    console.log(req.params.id);
    res.render("todo/onetodoview", {
      oneTodo,
      style: ["onetodostyle.css", "style.css"],
    });
  } catch (error) {
    next(error);
  }
});

// Update route to do entière
router.post("/todos/:id/update", async (req, res, next) => {
  try {
    await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(req.body);
  } catch (error) {
    next(error);
  }
});

router.patch("/todos/:todoId/:taskId", async (req, res, next) => {
  const { todoId, taskId } = req.params;
  console.log(req.body);
  try {
    const updatedTodo = await Todo.findById(todoId);
    for (const task of updatedTodo.content) {
      if (task.id === taskId) {
        task.task = req.body.task;
      }
    }
    await updatedTodo.save();
    res.json(updatedTodo);
  } catch (error) {
    next(error);
  }
});

// Delete route to do entière
router.post("/todos/:id/delete", async (req, res, next) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json("/todos");
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
