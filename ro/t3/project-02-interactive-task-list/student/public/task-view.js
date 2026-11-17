export function renderTasks(tasks, { document, list }) {
  list.replaceChildren();

  if (tasks.length === 0) {
    const empty = document.createElement('li');
    empty.className = 'empty';
    empty.textContent = 'Nu exista sarcini';
    list.append(empty);
    return;
  }

  for (const task of tasks) {
    const item = document.createElement('li');
    item.dataset.taskId = task.id;
    if (task.completed) item.classList.add('completed');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.dataset.action = 'toggle';

    const title = document.createElement('span');
    title.textContent = task.title;

    const remove = document.createElement('button');
    remove.type = 'button';
    remove.dataset.action = 'delete';
    remove.textContent = 'Sterge';

    item.append(checkbox, title, remove);
    list.append(item);
  }
}

export function bindTaskEvents({ form, list, onAdd, onToggle, onDelete }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const field = form.elements?.title ?? form.querySelector('[name="title"]');
    const title = field.value.trim();
    if (!title) return;
    onAdd(title);
    form.reset();
  };

  const handleClick = (event) => {
    const row = event.target.closest('[data-task-id]');
    const control = event.target.closest('[data-action]');
    if (!row || !control) return;

    const id = row.dataset.taskId;
    if (control.dataset.action === 'toggle') onToggle(id);
    else if (control.dataset.action === 'delete') onDelete(id);
  };

  form.addEventListener('submit', handleSubmit);
  list.addEventListener('click', handleClick);

  return () => {
    form.removeEventListener('submit', handleSubmit);
    list.removeEventListener('click', handleClick);
  };
}