import React from 'react';
import Header from './components/Header/Header';
import './App.css';
import TodoTable from './components/todoList/TodoTable';

function App() {
  return (
    <main>
      <Header />
      <TodoTable />
    </main>
  );
}

export default App;
