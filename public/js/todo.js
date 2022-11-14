const filesContainer = document.querySelector(".files-container");

document
  .getElementById("add-title")
  .addEventListener("click", async function (event) {
    const todo = {
      title: document.getElementById("new-todo-input").value,
    };
    console.log(todo);
    try {
      axios
        .post(`http://localhost:3000/todos/create`, todo)
        .then((response) => {
          if (document.querySelector('[name="title"]')) {
            axios.post(`http://localhost:3000/todos/title`);
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
