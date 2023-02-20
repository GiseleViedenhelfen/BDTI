import React from 'react';
import './Style.css';
import listIcon from '../../assets/icons/clipboard-text.png';
import AddTodo from '../editTodo/AddTodo';

// lint nao aceitou ser um componente de classe ja que nao ha logica nele
function Header() {
  return (
    <header>
      <section>
        <h1>Lista de Tarefas BDTI</h1>
        <img src={listIcon} alt="list-icon" width="30px" />
      </section>
      <div>
        <AddTodo />
      </div>
    </header>

  );
}

export default Header;
