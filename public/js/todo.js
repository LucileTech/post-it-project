const filesContainer = document.querySelector(".files-container");
const toDoInput = document.getElementById("new-todo-input");
const taskList = document.querySelector("#tasks");
document
  .getElementById("add-title")
  .addEventListener("click", async function (event) {
    const todo = {
      [toDoInput.name]: toDoInput.value,
    };
    console.log(todo);
    try {
      let url = "http://localhost:3000/todos/create";

      if (toDoInput.name === "task") {
        url = `http://localhost:3000/todos/${toDoInput.dataset.todoId}/tasks/add`;
      }
      axios.post(url, todo).then((response) => {
        const { data } = response;
        if (toDoInput.name === "title") {
          toDoInput.name = "task";
          toDoInput.dataset.todoId = data._id;
          document.querySelector(".transformation-line").textContent =
            data.title;
        } else if (toDoInput.name === "task") {
          const taskLine = document.createElement("li");
          taskLine.textContent = data.task;
          taskList.append(taskLine);
        }
        console.log(response);
      });
    } catch (error) {
      console.log(error);
    }
  });

document
  .getElementById("add-task")
  .addEventListener("click", async function (event) {
    const todo = {
      task: document.getElementById("new-task-input").value,
    };
    console.log(todo);
    try {
      axios
        .post(`http://localhost:3000/todos/create`, todo)
        .then((response) => {
          console.log(response);
        });
    } catch (error) {
      console.log(error);
    }
  });
