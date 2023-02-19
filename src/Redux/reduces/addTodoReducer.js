const INICIAL_STATE = {
  todos: [],
};
const todoReducer = (state = INICIAL_STATE, action) => {
  switch (action.type) {
  case 'ADD':
    return {
      ...state,
      todos: [...state.todos, action.payload],
    };
    case 'EDIT':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? action.payload : todo
        ),
      };
  default:
    return state;
  }
};
export default todoReducer;