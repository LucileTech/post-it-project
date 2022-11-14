const filesContainer = document.querySelector(".files-container");

document
  .getElementById("add-todo")
  .addEventListener("click", async function (event) {
    const todo = {
      title: document.getElementById("new-todo-input").value,
      content: [{}],
    };
    console.log(todo);
    try {
      axios
        .post(`http://localhost:3000/todo/newtodo`, todo)
        .then((response) => {
          console.log(response);
        });
    } catch (error) {
      console.log(error);
    }
  });
