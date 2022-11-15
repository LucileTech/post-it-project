document
  .getElementById("save-button")
  ?.addEventListener("click", async function (event) {
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

document
  .getElementById("edit-button")
  ?.addEventListener("click", async function (event) {
    const note = {
      title: document.getElementById("edit-note-title").value,
      content: document.getElementById("edit-note-content").value,
    };
    try {
      const id = document.getElementById("edit-button").closest("section")
        .dataset.id;
      axios
        .post(`http://localhost:3000/notes/${id}/update`, note)
        .then((response) => {
          console.log(note);
          if (response.status === 200) {
            window.location = "/notes";
          }
          console.log(response);
        });
    } catch (error) {
      console.log(error);
    }
  });

document
  .getElementById("trashbin-button")
  ?.addEventListener("click", async function (event) {
    try {
      const id = document
        .getElementById("trashbin-button")
        .closest("#section-buttons").dataset.id;
      axios
        .post(`http://localhost:3000/notes/${id}/delete`)
        .then((response) => {
          console.log(response);
        });
    } catch (error) {
      console.log(error);
    }
  });
