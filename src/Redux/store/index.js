import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';
import todoReducer from '../reduces/todoReducer';

const persistConfig = {
  key: 'root',
  storage,
};
const persistedReducer = persistReducer(persistConfig, todoReducer);
export const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export const persistor = persistStore(store);
