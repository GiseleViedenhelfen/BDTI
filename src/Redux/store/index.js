import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';
import rootReducer from '../reduces';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
  );

export default store;