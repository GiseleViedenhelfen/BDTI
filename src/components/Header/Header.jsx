import React,{ Component } from "react";
import AddTodo from "../AddTodo/AddTodo";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddTodo: false
    };
    this.handleAddTodoClick = this.handleAddTodoClick.bind(this);
  }
  handleAddTodoClick() {
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
        <h3>listar todas as tarefas</h3>
        <h3>listar tarefas concluídas</h3>
        <h3>listar tarefas a fazer</h3>
      </section>
  </header>
    )
  }
}

export default Header;