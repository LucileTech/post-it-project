document
  .getElementById("save-button")
  .addEventListener("click", async function (event) {
    const note = {
      title: document.getElementById("note-title").value,
      content: document.getElementById("note-content").value,
    };
    console.log(note);
    try {
      axios
        .post(`http://localhost:3000/notes/create`, note)
        .then((response) => {
          if (response.status === 200) {
            window.location = "/notes";
          }
          console.log(response);
        });
    } catch (error) {
      console.log(error);
    }
  });
