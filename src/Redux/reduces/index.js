import { combineReducers } from 'redux';
import { addTodo } from '../actions';


const rootReducer = combineReducers({todos: addTodo});

export default rootReducer;