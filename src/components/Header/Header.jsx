import React,{ Component } from "react";
import AddTodo from "../AddTodo/AddTodo";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      showAddTodo: false
    };
  }

  handleAddTodoClick = () => {
    this.setState({ showAddTodo: !this.state.showAddTodo });
  }
  render() {
    const { showAddTodo } = this.state;
    return(
    <header>
      <section>
        <h1>Lista de Tarefas</h1>
        <button onClick={this.handleAddTodoClick}>Nova Tarefa</button>
        { showAddTodo && <AddTodo /> }
      </section>
      <section>
        <button>listar todas as tarefas</button>
        <button>listar tarefas concluídas</button>
        <button>listar tarefas a fazer</button>
      </section>
  </header>
    )
  }
}

export default Header;