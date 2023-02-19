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
  payload: del
})
