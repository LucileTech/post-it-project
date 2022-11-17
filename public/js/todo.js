// const { default: axios } = require("axios");

const filesContainer = document.querySelector(".files-container");
const toDoInput = document.getElementById("new-todo-input");
const taskInput = document.getElementById("nnew-task-input-edit-page");
const taskList = document.querySelector("#tasks");
const taskContent = document.querySelector(".content");
const taskTemplate = document.getElementById("task-template");
const toDoInputUpdate = document.getElementById("new-task-input-edit-page");
const eachTodoContent = document.querySelector(".each-todo");

// Add a title on the TO DO

document
  .getElementById("add-title")
  ?.addEventListener("click", async function (event) {
    const todo = {
      [toDoInput.name]: toDoInput.value,
    };
    try {
      let url = "https://post-it-project.onrender.com/todos/create";

      if (toDoInput.name === "task") {
        url = `https://post-it-project.onrender.com/todos/${toDoInput.dataset.todoId}/tasks/add`;
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

// Delete a TO DO
document
  .getElementById("delete-one-todo")
  ?.addEventListener("click", async function (event) {
    event.preventDefault();
    try {
      const id = document.getElementById("outils-one-todo").dataset.id;
      axios
        .post(`https://post-it-project.onrender.com/todos/${id}/delete`)
        .then((response) => {
          if (response.data.status === "deleted") {
            window.location.replace(
              "https://post-it-project.onrender.com/todos"
            );
          }
          console.log(response.data.status);
        });
    } catch (error) {
      console.log(error);
    }
  });

// Edit the title of a TO DO
document
  .getElementById("edit-button-todo-title")
  ?.addEventListener("click", async function (event) {
    const todo = {
      title: document.getElementById("edit-todo-title").value,
    };
    try {
      const id = document.getElementById("section-one-todo").dataset.id;
      axios
        .post(`https://post-it-project.onrender.com/todos/${id}/update`, todo)
        .then((response) => {});
    } catch (error) {
      console.log(error);
    }
  });
``;

document.querySelectorAll(".edit-button").forEach((button) => {
  button.addEventListener("click", async function (event) {
    event.preventDefault();
    const endpoint = event.target.getAttribute("href");
    const todo = {
      task: event.target.closest("article").querySelector("input").value,
    };
    try {
      axios
        .patch(`https://post-it-project.onrender.com${endpoint}`, todo)
        .then((response) => {
          console.log(response);
        });
    } catch (error) {
      console.log(error);
    }
  });
});

//Delete a task
document.querySelectorAll(".delete-button-task").forEach((button) => {
  button.addEventListener("click", async function (event) {
    event.preventDefault();
    const endpoint = event.target.getAttribute("href");
    const todo = {
      task: event.target.closest("article").querySelector("input").value,
    };
    try {
      axios
        .post(`https://post-it-project.onrender.com${endpoint}`, todo)
        .then((response) => {
          console.log(response);
          window.location.reload();
        });
    } catch (error) {
      console.log(error);
    }
  });
});

// Edit task by task on the TO DO
document
  .getElementById("add-task-edit-page")
  ?.addEventListener("click", async function (event) {
    const todoedit = {
      ["task"]: toDoInputUpdate.value,
    };
    console.log(toDoInputUpdate.value);
    console.log(toDoInputUpdate.dataset.todoId);
    try {
      let url = `https://post-it-project.onrender.com/todos/${toDoInputUpdate.dataset.todoId}/tasks/add/edit`;
      axios.post(url, todoedit).then((response) => {
        console.log("test", response.data);
        const { data } = response;
        // const clone = taskTemplate.content.cloneNode(true);
        // clone.querySelector("input").value = data.task;
        // clone.querySelector("a").href += data._id;
        // console.log(data._id);

        // //function edit
        // clone
        //   .querySelector("a")
        //   .addEventListener("click", async function (event) {
        //     event.preventDefault();
        //     const endpoint = event.target.getAttribute("href");
        //     const todo = {
        //       task: event.target.closest("article").querySelector("input")
        //         .value,
        //     };
        //     try {
        //       axios
        //         .patch(`https://post-it-project.onrender.com${endpoint}`, todo)
        //         .then((response) => {
        //           console.log(response);
        //         });
        //     } catch (error) {
        //       console.log(error);
        //     }
        //   });
        // /////end function edit
        // taskContent.append(clone);
        toDoInputUpdate.value = "";
        window.location.reload();
      });
    } catch (error) {
      console.log(error);
    }
  });

document
  .getElementById("div-blue-button")
  ?.addEventListener("click", async function (event) {
    eachTodoContent.classList.add("blue");
  });

document
  .getElementById("div-red-button")
  ?.addEventListener("click", async function (event) {
    eachTodoContent.classList.add("red");
  });

// Delete todos in all notes page
document
  .querySelectorAll(".trashbin-button-all-todos")
  .forEach((buttonDeleteTodo) => {
    buttonDeleteTodo.addEventListener("click", async function (event) {
      event.preventDefault();
      try {
        const id = event.target.closest("section").dataset.id;
        axios
          .post(`https://post-it-project.onrender.com/alltodos/${id}/delete`)
          .then((response) => {
            event.target.closest(".each-todo").remove();
          });
      } catch (error) {
        console.log(error);
      }
    });
  });
