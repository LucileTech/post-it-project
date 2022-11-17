// Save note
document
  .getElementById("save-button")
  ?.addEventListener("click", async function (event) {
    const note = {
      title: document.getElementById("create-note-title").value,
      content: document.getElementById("create-note-content").value,
    };
    console.log(note);
    try {
      axios
        .post(`http://localhost:3000/notes/create`, note)
        .then((response) => {
          if (response.status === 201) {
            const id = response.data._id;
            window.location = "/notes/" + id;
          }
          console.log(response);
        });
    } catch (error) {
      console.log(error);
    }
  });

//Edit note
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
          console.log(response);
        });
    } catch (error) {
      console.log(error);
    }
  });

//Edit color button
document
  .getElementById("edit-button")
  ?.addEventListener("click", async function (event) {
    document
      .querySelector(".class-button-edit-note")
      .classList.add("class-button-edit-note-bis");
    document
      .querySelector(".class-button-edit-note")
      .classList.remove("class-button-edit-note");
  });

// Delete note
document
  .getElementById("trashbin-button")
  ?.addEventListener("click", async function (event) {
    try {
      const id = document.getElementById("trashbin-button").closest("section")
        .dataset.id;
      axios
        .post(`http://localhost:3000/notes/${id}/delete`)
        .then((response) => {
          console.log(response);
        });
    } catch (error) {
      console.log(error);
    }
  });

// Delete note in all notes page
document
  .querySelectorAll(".trashbin-button-all-notes")
  .forEach((buttonDelete) => {
    buttonDelete.addEventListener("click", async function (event) {
      event.preventDefault();
      try {
        const id = event.target.closest("section").dataset.id;
        axios
          .post(`http://localhost:3000/allnotes/${id}/delete`)
          .then((response) => {
            event.target.closest(".each-note").remove();
          });
      } catch (error) {
        console.log(error);
      }
    });
  });
