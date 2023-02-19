import React from 'react';
import Header from './components/Header/Header';
import FilterByStatus from './components/todoList/filterByStatus';
// import TodoTable from './components/Table/TodoTable';

function App() {
  return (
    <main>
      <Header />
      <FilterByStatus />
      {/* <TodoTable /> */}
    </main>
  );
}

export default App;
