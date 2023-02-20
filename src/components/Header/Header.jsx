import React from 'react';
import AddTodo from '../editTodo/AddTodo';
// import './Style.css';

function Header() {
  return (
    <div>
      <header>
        <section>
          <h1>Lista de Tarefas</h1>
          <AddTodo />
        </section>
      </header>
    </div>
  );
}

export default Header;
