export function renderTodoList({ todoListID, todoList }) {
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
