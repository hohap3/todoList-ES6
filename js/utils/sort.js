import { renderTodoList } from "./todo.js";

export function sortNameByAtoZ({ button, todoList }) {
  if (!Array.isArray(todoList)) return;

  const sortBtn = document.querySelector(button);

  if (!sortBtn) return;

  sortBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (todoList.length < 1) return;

    const newTodoList = [...todoList];

    newTodoList.sort((a, b) => a.todoName.localeCompare(b.todoName));

    renderTodoList({ todoListID: "#todo", todoList: newTodoList });
  });
}

export function sortNameByZtoA({ button, todoList }) {
  if (!Array.isArray(todoList)) return;

  const sortBtn = document.querySelector(button);
  if (!sortBtn) return;

  sortBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (todoList.length < 1) return;

    const newTodoList = [...todoList];

    newTodoList.sort((a, b) => b.todoName.localeCompare(a.todoName));

    renderTodoList({ todoListID: "#todo", todoList: newTodoList });
  });
}
