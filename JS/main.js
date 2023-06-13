const toDoContainer = document.getElementById("toDoContainer");
const addToDoButton = document.getElementById("addToDoBtn");
const toDoBtn = document.querySelector(".toDoBtn");
const inputData = document.getElementById("inputData");

// Función principal para agregar To-Dos al To-Do container
function addToDo() {
  const text = inputData.value;
  if (text === "") {
    inputData.style.borderColor = "red";
    inputData.setAttribute(
      "placeholder",
      "Por favor, ingresa una tarea válida"
    );
    return;
  } else {
    inputData.style.borderColor = "#2061cb";
    inputData.setAttribute("placeholder", "Escribe una tarea");
  }

  const todoItem = document.createElement("div");
  todoItem.innerHTML = `<div class="toDoItem container d-flex justify-content-between align-items-center mb-2">
          <p class="toDoText mx-2">${text}</p>
          <div class="buttons-wrapper d-flex justify-content-between gap-2">
            <button class="btn toDoBtn checkBtn bg-success"><i class="bi bi-check2"></i></button>
            <button class="btn toDoBtn editBtn bg-secondary"><i class="bi bi-pencil-square"></i></button>
            <button class="btn toDoBtn deleteBtn bg-danger"><i class="bi bi-trash"></i></button>
          </div>
      </div>`;

  toDoContainer.appendChild(todoItem);

  const checkButton = todoItem.querySelector(".checkBtn");
  const editButton = todoItem.querySelector(".editBtn");
  const deleteButton = todoItem.querySelector(".deleteBtn");

  checkButton.addEventListener("click", function () {
    todoItem.querySelector(".toDoText").classList.toggle("underlined");
  });

  editButton.addEventListener("click", function () {
    const toDoText = todoItem.querySelector(".toDoText");
    toDoText.contentEditable = true;
    toDoText.focus();
    setCursorToEnd(toDoText); //Esta función está un poquito más abajo, perdonen el espagueti.
    toDoText.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        toDoText.contentEditable = false;

        //Este time out es necesario para que el disparador de eventos de click no se ejecute antes de que se haya terminado de escribir el texto.
        setTimeout(function() {
            if (toDoText.textContent === "") {
              deleteButton.click();
            }
          }, 100);
      }
    });
         
      if (toDoText.classList.contains("underlined")) {
        checkButton.click();
      }
  });

  deleteButton.addEventListener("click", function () {
    toDoContainer.removeChild(todoItem);
  });

  inputData.value = "";
}

//Esta función permite que el botón "Agregar" sea activado al presionar la tecla "Enter", una mejora de calidad de vida.

addToDoButton.addEventListener("click", addToDo);
inputData.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addToDo();
  }
});

//Esta función permite que el cursor se posicione al final de un elemento. Es muy útil.
function setCursorToEnd(el) {
  el.focus();
  if (
    typeof window.getSelection != "undefined" &&
    typeof document.createRange != "undefined"
  ) {
    const range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  } else if (typeof document.body.createTextRange != "undefined") {
    const textRange = document.body.createTextRange();
    textRange.moveToElementText(el);
    textRange.collapse(false);
    textRange.select();
  }
}
