import {
  sortNameByAtoZ,
  sortNameByZtoA,
  renderTodoList,
} from "./utils/index.js";
import { todoList, todoCompletedList } from "./constants/constants.js";

function addTodoList({ cardAddClass, buttonID, inputID }) {
  const cardAddEle = document.querySelector(cardAddClass);
  if (!cardAddEle) return;

  const addBtn = cardAddEle.querySelector(buttonID);
  if (addBtn) {
    addBtn.addEventListener("click", () => {
      const inputEle = cardAddEle.querySelector(inputID);
      if (!inputEle) return;
      if (inputEle.value === "" || inputEle.value.trim().length < 1) {
        window.alert("Please insert todo");
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

window.handleRemoveTodo = function (id, todoID) {
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
};

window.handleAddRemoveCompletedElement = function (id, todoID) {
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
};

function handleSortName({ todoList, mode }) {
  if (!Array.isArray(todoList) || todoList.length < 1) return;

  const newTodoList = [...todoList];

  if (mode === "Z-A")
    newTodoList.sort((a, b) => b.todoName.localeCompare(a.todoName));
  else newTodoList.sort((a, b) => a.todoName.localeCompare(b.todoName));

  renderTodoList({ todoListID: "#todo", todoList: newTodoList });
}

function main() {
  addTodoList({
    cardAddClass: ".card__add",
    buttonID: "#addItem",
    inputID: "#newTask",
  });

  sortNameByAtoZ({
    button: "#two",
    onSubmitClick: () => handleSortName({ todoList, mode: "A-Z" }),
  });
  sortNameByZtoA({
    button: "#three",
    onSubmitClick: () => handleSortName({ todoList, mode: "Z-A" }),
  });
}

main();
