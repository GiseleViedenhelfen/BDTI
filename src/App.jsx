import React from 'react';
import Header from './components/Header/Header';
import TodoTable from './components/todoList/TodoTable';
import './App.css';

function App() {
  return (
    <main>
      <Header />
      <TodoTable />
    </main>
  );
}

export default App;
