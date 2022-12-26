export function sortNameByAtoZ({ button, onSubmitClick }) {
  const sortBtn = document.querySelector(button);

  if (!sortBtn) return;

  sortBtn.addEventListener("click", (e) => {
    e.preventDefault();

    onSubmitClick?.();
  });
}

export function sortNameByZtoA({ button, onSubmitClick }) {
  const sortBtn = document.querySelector(button);
  if (!sortBtn) return;

  sortBtn.addEventListener("click", (e) => {
    e.preventDefault();

    onSubmitClick?.();
  });
}
