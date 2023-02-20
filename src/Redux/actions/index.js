export const addTodo = (add) => ({
  type: 'ADD',
  payload: add,
});
export const editTodo = (edit) => ({
  type: 'EDIT',
  payload: edit,
});
export const deleteTodo = (del) => ({
  type: 'DELETE',
  payload: del,
});

export const countTodos = (todos) => {
  const countTodosByStatus = todos.reduce((acc, task) => {
    const { status } = task;
    acc[status] = acc[status] + 1 || 1;
    acc.Total = acc.Total + 1 || 1;
    return acc;
  }, {});
  return {
    type: 'COUNT',
    payload: countTodosByStatus,
  };
};
