import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteTodo as deleteTodoAction, editTodo as editTodoAction } from '../../Redux/actions';
import TodoEditor from '../editTodo/EditTodo';
import './Style.css';
// import { connect } from 'react-redux';
// import { editTodo as editTodoAction } from '../../Redux/actions';

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
            <input
              type="checkbox"
              onChange={() => this.handleCheck(todo)}
            />
            <span style={{
              textDecoration: todo.status === 'Done' ? 'line-through' : 'none',
            }}
            >
              {todo.task}
            </span>
            <button type="button" onClick={() => this.handleEdit(todo)}>
              Editar
            </button>
            {/* renderiza o todoEditor apenas para a tarefa em edicao */}
            { showEditTodo
            && todo.id === todoToEdit.id
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

  handleCheck = (todo) => {
    // Cria o toggle para trocar o status da tarefa de nova ou feita
    const { editTodo } = this.props;
    const newStatus = todo.status === 'Done' ? 'In-progress' : 'Done';
    editTodo({ ...todo, status: newStatus });
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
  editTodo: (newTodo) => dispatch(editTodoAction(newTodo)),
});

TodoTable.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      task: PropTypes.string.isRequired,
      status: PropTypes.oneOf(['In-progress', 'Done']).isRequired,
    }),
  ).isRequired,
  deleteTodo: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,

};
export default connect(mapStateToProps, mapDispatchToProps)(TodoTable);
