import React from 'react';
import Header from './components/Header/Header';
// import FilterByStatus from './components/todoList/filterByStatus';
import './App.css';
import TodoTable from './components/todoList/TodoTable';

function App() {
  return (
    <main>
      <Header />
      {/* <FilterByStatus /> */}
      <TodoTable />
    </main>
  );
}

export default App;
