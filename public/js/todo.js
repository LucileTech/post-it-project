// const { default: axios } = require("axios");

const filesContainer = document.querySelector(".files-container");
const toDoInput = document.getElementById("new-todo-input");
const taskInput = document.getElementById("nnew-task-input-edit-page");
const taskList = document.querySelector("#tasks");
const taskContent = document.querySelector(".content");
const taskTemplate = document.getElementById("task-template");
document
  .getElementById("add-title")
  ?.addEventListener("click", async function (event) {
    const todo = {
      [toDoInput.name]: toDoInput.value,
    };
    try {
      let url = "http://localhost:3000/todos/create";

      if (toDoInput.name === "task") {
        url = `http://localhost:3000/todos/${toDoInput.dataset.todoId}/tasks/add`;
      }
      axios.post(url, todo).then((response) => {
        const { data } = response;
        if (toDoInput.name === "title") {
          toDoInput.name = "task";
          toDoInput.placeholder = "Your task";
          toDoInput.dataset.todoId = data._id;
          document.querySelector(".transformation-line").textContent =
            data.title;
          toDoInput.value = "";
        } else if (toDoInput.name === "task") {
          const taskLine = document.createElement("li");
          taskLine.textContent = data.task;
          taskList.append(taskLine);
          toDoInput.value = "";
          toDoInput.placeholder = "Your task";
        }
        console.log(response);
      });
    } catch (error) {
      console.log(error);
    }
  });

document
  .getElementById("delete-one-todo")
  ?.addEventListener("click", async function (event) {
    try {
      const id = document.getElementById("section-one-todo").dataset.id;
      axios
        .post(`http://localhost:3000/todos/${id}/delete`)
        .then((response) => {
          console.log(response);
        });
    } catch (error) {
      console.log(error);
    }
  });

document
  .getElementById("edit-button-todo-title")
  ?.addEventListener("click", async function (event) {
    const todo = {
      title: document.getElementById("edit-todo-title").value,
    };
    try {
      const id = document.getElementById("section-one-todo").dataset.id;
      axios
        .post(`http://localhost:3000/todos/${id}/update`, todo)
        .then((response) => {
          console.log(response);
        });
    } catch (error) {
      console.log(error);
    }
  });

document.querySelectorAll(".edit-button").forEach((button) => {
  button.addEventListener("click", async function (event) {
    event.preventDefault();
    const endpoint = event.target.getAttribute("href");
    const todo = {
      task: event.target.closest("article").querySelector("input").value,
    };
    try {
      axios.patch(`http://localhost:3000${endpoint}`, todo).then((response) => {
        console.log(response);
        // console.log(todo.task);
        // document.querySelector(".one-task-edit-page").textContent = todo.task;
      });
    } catch (error) {
      console.log(error);
    }
  });
});

const toDoInputUpdate = document.getElementById("new-task-input-edit-page");

document
  .getElementById("add-task-edit-page")
  ?.addEventListener("click", async function (event) {
    const todoedit = {
      ["task"]: toDoInputUpdate.value,
    };
    console.log(toDoInputUpdate.value);
    console.log(toDoInputUpdate.dataset.todoId);
    try {
      let url = `http://localhost:3000/todos/${toDoInputUpdate.dataset.todoId}/tasks/add/edit`;
      axios.post(url, todoedit).then((response) => {
        const { data } = response;
        const clone = taskTemplate.content.cloneNode(true);
        clone.querySelector("input").value = data.task;
        clone.querySelector("a").href += data._id;
        taskContent.append(clone);
        // const taskLineEdit = document.createElement("input");
        // taskLineEdit.textContent = data.task;
        //taskInputEdit.append(taskLineEdit);
        // toDoInputUpdate.value = "";
        // toDoInputUpdate.placeholder = "Your task";
        toDoInputUpdate.value = "";
      });
    } catch (error) {
      console.log(error);
    }
  });
