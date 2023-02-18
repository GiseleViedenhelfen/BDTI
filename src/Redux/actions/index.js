export const addTodo = (add) => ({
  type: 'ADD',
  add,
});
export const EditTodo = (edit) => ({
  type: 'EDIT',
  edit,
});
export const DeleteTodo = (del) => ({
  type: 'DELETE',
  ...del,
});