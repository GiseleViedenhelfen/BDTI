import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';
import todoReducer from '../reduces/addTodoReducer';
console.log(typeof todoReducer)
const store = createStore(
  todoReducer,
  composeWithDevTools(applyMiddleware(thunk)),
  );

export default store;