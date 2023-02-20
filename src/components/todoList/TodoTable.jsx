import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteTodo as deleteTodoAction } from '../../Redux/actions';
import TodoEditor from '../editTodo/EditTodo';
import './Style.css';

class TodoTable extends Component {
  constructor() {
    super();
    this.state = {
      showEditTodo: false,
      todoToEdit: null,
    };
  }

  renderTodos = (arr) => {
    const { showEditTodo, todoToEdit } = this.state;
    return (
      arr.map((todo) => (
        <ul key={todo.id}>
          <li className="ul-task">
            <span>{todo.task}</span>
            <span>{todo.status}</span>
            <button type="button" onClick={() => this.handleEdit(todo)}>
              Editar
            </button>
            {/* renderiza o todoEditor apenas para a tarefa em edicao */}
            { showEditTodo && todo.id === todoToEdit.id
            && (
              <div>
                <TodoEditor
                  todoToEdit={todoToEdit}
                  onClose={this.handleCloseModal}
                />
              </div>
            )}
            <button type="button" onClick={() => this.handleDelete(todo.id)}>
              Excluir
            </button>
          </li>
        </ul>
      ))
    );
  };

  handleEdit = (todo) => {
    const { showEditTodo } = this.state;
    // atualiza no estado se o modal deve estar visivel ou nao e qual a tarefa a editar
    this.setState({ showEditTodo: !showEditTodo, todoToEdit: todo });
  };

  handleCloseModal = () => {
    // funcao para fechar o modal quando a tarefa for atualizada
    this.setState({
      showEditTodo: false,
      todoToEdit: null,
      filter: null,
    });
  };

  handleDelete = (id) => {
    const { deleteTodo } = this.props;
    // abre um prompt para confirmacao antes de deletar
    const confirmDelete = window
      .confirm('Tem certeza que deseja excluir esta tarefa?');
      // havendo a confirmacao, chama a action de deletar a tarefa
    if (confirmDelete) {
      deleteTodo(id);
    }
  };

  getTodosByFilter = (type) => {
    const { todos } = this.props;
    // filtra as tarefas por status caso nao seja nem fazendo nem feitas, mostra todas
    switch (type) {
      case 'In-progress':
        return this.renderTodos(todos.filter((task) => task.status === 'In-progress'));
      case 'Done':
        return this.renderTodos(todos.filter((task) => task.status === 'Done'));
      default:
        return this.renderTodos(todos);
    }
  };

  render() {
    const { filter } = this.state;
    return (
      <div>
        <section className="todo-type-container">
          <button
            type="button"
            onClick={() => this.setState({ filter: null })}
          >
            listar todas as tarefas
          </button>
          <button
            type="button"
            onClick={() => this.setState({ filter: 'In-progress' })}
          >
            listar tarefas a fazer

          </button>
          <button
            type="button"
            onClick={() => this.setState({ filter: 'Done' })}
          >
            listar tarefas concluídas
          </button>
        </section>
        {this.getTodosByFilter(filter)}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  todos: state.todos,
});
const mapDispatchToProps = (dispatch) => ({
  deleteTodo: (id) => dispatch(deleteTodoAction(id)),
});

TodoTable.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      task: PropTypes.string.isRequired,
      status: PropTypes.oneOf(['New', 'In-progress', 'Done']).isRequired,
    }),
  ).isRequired,
  deleteTodo: PropTypes.func.isRequired,

};
export default connect(mapStateToProps, mapDispatchToProps)(TodoTable);
