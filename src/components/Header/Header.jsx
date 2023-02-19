import React, { Component } from 'react';
import TodoEditor from '../editTodo/EditTodo';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      showAddTodo: false,
    };
  }

  handleAddTodoClick = () => {
    const { showAddTodo } = this.state;
    this.setState({ showAddTodo: !showAddTodo });
  };

  render() {
    const { showAddTodo } = this.state;
    return (
      <div>
        <header>
          <section>
            <h1>Lista de Tarefas</h1>
            <button
              type="button"
              onClick={this.handleAddTodoClick}
            >
              Nova Tarefa
            </button>
            { showAddTodo && <TodoEditor onClose={this.handleCloseModal} /> }
          </section>
        </header>
      </div>
    );
  }
}

export default Header;
