const sortTodos = (todos) => {
  const sortData = {};

  todos.map((todo) => {
    if (!sortData[todo.status]) sortData[todo.status] = [];

    sortData[todo.status].push(todo);
  });
  return sortData;
};

export { sortTodos };
