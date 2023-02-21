// import React from 'react';
// import { Provider } from 'react-redux';
// // import thunk from 'redux-thunk';
// // import { persistStore, persistReducer } from 'redux-persist';
// // import { PersistGate } from 'redux-persist/integration/react';
// // import storage from 'redux-persist/lib/storage';
// // import { composeWithDevTools } from '@redux-devtools/extension';
// import { render } from '@testing-library/react';
// import {
//   legacy_createStore as createStore,
//   combineReducers,
//   // applyMiddleware,
// } from 'redux';
// import todoReducer from '../Redux/reduces/todoReducer';

// // const persistConfig = {
// //   key: 'root',
// //   storage,
// // };
// // const persistedReducer = persistReducer(persistConfig, todoReducer);

// // const store = createStore(
// //   persistedReducer,
// //   composeWithDevTools(applyMiddleware(thunk)),
// // );

// // const persistor = persistStore(store);

// const renderWithRedux = (
//   component,
//   {
//     initialState,
//     store = createStore(todoReducer, initialState),
//   } = {},
// ) => ({
//   ...render(
//     <Provider store={store}>
//       {/* <PersistGate loading={null} persistor={persistor}> */}
//         {component}
//       {/* </PersistGate> */}
//     </Provider>,
//   ),
//   store,
// });
// export default renderWithRedux;
import React from 'react';
import { Provider } from 'react-redux';
import { render as rtlRender } from '@testing-library/react';
import { store, persistor } from '../Redux/store';

const renderWithRedux = (
  component,
  { store: customStore } = {},
) => {
  const renderResult = rtlRender(
    <Provider store={customStore || store}>
      {component}
    </Provider>,
  );
  return {
    ...renderResult,
    store,
    persistor,
  };
};

export default renderWithRedux;
