// inicia a lista de tarefas vazia
const INICIAL_STATE = {
  todos: [],
  count: {
    Todo: 0,
    Doing: 0,
    Done: 0,
    Total: 0,
  },
};
const todoReducer = (state = INICIAL_STATE, action) => {
  switch (action.type) {
    case 'ADD':
      return {
        ...state,
        // retorna um novo array com o array antigo mais a nova tarefa
        todos: [...state.todos, action.payload],
      };
    case 'EDIT':
      return {
        ...state,
        // usa o map para que se o id da tarefa for o editado,
        // o valor seja substituido
        // caso nao, retorna o valor original
        todos: state.todos.map((todo) => (todo.id === action.payload.id ? action.payload : todo)),
      };
    case 'DELETE':
      return {
        ...state,
        // entrega novo array com as tarefas exceto a de id selecionado
        todos: state.todos
          .filter((todo) => todo.id !== action.payload),
      };
      // action para contar os todos por status
    case 'COUNT':
      return {
        ...state,
        count: action.payload,
      };
      // caso nao seja nenhum desses casos, o que pelo codigo atual nao é possivel rs
      // retorna o array original recebido.
    default:
      return state;
  }
};

export default todoReducer;
