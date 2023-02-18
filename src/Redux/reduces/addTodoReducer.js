// Esse reducer será responsável por trazer as informacoes de criacao da tarefa
const ESTADO_INICIAL = {
  valor: '',
};
const todo = (state = ESTADO_INICIAL, action) => {
  switch (action.type) {
  case 'ADD':
    return {
      ...state,
      task: action.taskStr,
    };
  default:
    return state;
  }
};
export default todo;