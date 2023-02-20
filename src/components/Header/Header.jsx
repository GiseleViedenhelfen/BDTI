import React from 'react';
import AddTodo from '../editTodo/AddTodo';
import './Style.css';
import listIcon from '../../assets/icons/clipboard-text.png';

// lint nao aceitou ser um componente de classe ja que nao ha logica nele
function Header() {
  return (
    <div>
      <header>
        <section>
          <h1>Lista de Tarefas BDTI</h1>
          <img src={listIcon} alt="list-icon" width="30px" />
        </section>
        <AddTodo />
      </header>
    </div>
  );
}

export default Header;
