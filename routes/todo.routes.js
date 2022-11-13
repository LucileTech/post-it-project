const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo.model");

/* GET home page */
router.get("/todo", async (req, res, next) => {
  try {
    const myToDo = await Todo.find();
    console.log(myToDo.title);
    res.render("todo/todoview", {
      style: ["todostyle.css"],
      myToDo,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/todo/newtodo", async (req, res, next) => {
  try {
    const { title, content } = req.body;
    await Todo.create({ title, content });
    // res.redirect("/todo/");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
