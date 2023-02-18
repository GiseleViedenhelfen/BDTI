import { combineReducers } from 'redux';
import { addTodo } from '../actions';


const rootReducer = combineReducers({ addTodo });

export default rootReducer;