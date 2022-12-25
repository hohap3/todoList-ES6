const todoList = [];
const todoCompletedList = [];

function addTodoList({ cardAddClass, buttonID, inputID }) {
  const cardAddEle = document.querySelector(cardAddClass);
  if (!cardAddEle) return;

  const addBtn = cardAddEle.querySelector(buttonID);
  if (addBtn) {
    addBtn.addEventListener("click", () => {
      const inputEle = cardAddEle.querySelector(inputID);
      if (!inputEle) return;
      if (inputEle.value === "" || inputEle.value.trim().length < 1) {
        window.alert("Vui lòng nhập thông tin!");
        inputEle.focus();

        return;
      }

      todoList.push({ id: Date.now(), todoName: inputEle.value });

      renderTodoList({ todoListID: "#todo", todoList });

      inputEle.value = "";
      inputEle.focus();
    });
  }
}

function renderTodoList({ todoListID, todoList }) {
  if (!Array.isArray(todoList)) return;

  if (todoListID === "#todo") {
    const todoEle = document.querySelector(todoListID);
    if (!todoEle) return;

    let html = ``;

    todoList.forEach((todo) => {
      html += `<li data-id=${todo.id} >
      <span>${todo.todoName}</span>
  
      <div class="buttons">
        <button class="remove" onclick="handleRemoveTodo('${todo.id}','${todoListID}')" >
          <i class="fas fa-trash-alt"></i>
        </button>
       <button class="complete" onclick="handleAddRemoveCompletedElement('${todo.id}','${todoListID}')" >
        <i class="far fa-check-circle"></i>
      </button>
      
      </div>
    </li> `;
    });

    todoEle.innerHTML = html;
  } else {
    const todoEle = document.querySelector(todoListID);
    if (!todoEle) return;

    let html = ``;

    todoList.forEach((todo) => {
      html += `<li data-id=${todo.id} >
      <span>${todo.todoName}</span>
  
      <div class="buttons">
        <button class="remove" onclick="handleRemoveTodo('${todo.id}','${todoListID}')">
          <i class="fas fa-trash-alt"></i>
        </button>
       <button class="complete" onclick="handleAddRemoveCompletedElement('${todo.id}','${todoListID}')"  >
        <i class="fas fa-check-circle"></i>
      </button>
      
      </div>
    </li> `;
    });

    todoEle.innerHTML = html;
  }
}

function handleRemoveTodo(id, todoID) {
  if (!id) return;

  if (todoID === "#todo") {
    const todoEle = document.querySelector(todoID);
    if (!todoEle) return;

    const index = todoList.findIndex((todo) => todo.id === Number(id));
    if (index < 0) return;

    todoList.splice(index, 1);

    const liItem = todoEle.querySelector(`li[data-id="${id}"]`);
    if (liItem) liItem.remove();
  } else {
    const todoEle = document.querySelector(todoID);
    if (!todoEle) return;

    const index = todoCompletedList.findIndex((todo) => todo.id === Number(id));
    if (index < 0) return;

    todoCompletedList.splice(index, 1);

    const liItem = todoEle.querySelector(`li[data-id="${id}"]`);
    if (liItem) liItem.remove();
  }
}

function handleAddRemoveCompletedElement(id, todoID) {
  if (!id) return;

  if (todoID === "#todo") {
    const todoEle = document.querySelector(todoID);
    if (!todoEle) return;
    const index = todoList.findIndex((todo) => todo.id === Number(id));
    if (index < 0) return;

    const completedItem = todoList.splice(index, 1);
    todoCompletedList.push(...completedItem);

    // Remove element
    const liElement = todoEle.querySelector(`li[data-id="${id}"]`);
    if (liElement) liElement.remove();

    renderTodoList({ todoListID: "#completed", todoList: todoCompletedList });
  } else {
    const todoEle = document.querySelector(todoID);
    if (!todoEle) return;
    const index = todoCompletedList.findIndex((todo) => todo.id === Number(id));
    if (index < 0) return;

    const unCompletedItem = todoCompletedList.splice(index, 1);
    todoList.push(...unCompletedItem);

    // Remove element
    const liElement = todoEle.querySelector(`li[data-id="${id}"]`);
    if (liElement) liElement.remove();

    renderTodoList({ todoListID: "#todo", todoList });
  }
}

function sortNameByAtoZ({ button }) {
  const sortBtn = document.querySelector(button);
  if (!sortBtn) return;

  sortBtn.addEventListener("click", () => {
    if (todoList.length < 1) return;

    const newTodoList = [...todoList];

    newTodoList.sort((a, b) => a.todoName.localeCompare(b.todoName));

    renderTodoList({ todoListID: "#todo", todoList: newTodoList });
  });
}

function sortNameByZtoA({ button }) {
  const sortBtn = document.querySelector(button);
  if (!sortBtn) return;

  sortBtn.addEventListener("click", () => {
    if (todoList.length < 1) return;

    const newTodoList = [...todoList];

    newTodoList.sort((a, b) => b.todoName.localeCompare(a.todoName));

    renderTodoList({ todoListID: "#todo", todoList: newTodoList });
  });
}

addTodoList({
  cardAddClass: ".card__add",
  buttonID: "#addItem",
  inputID: "#newTask",
});

sortNameByAtoZ({ button: "#two" });
sortNameByZtoA({ button: "#three" });
