import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  deleteTodo as deleteTodoAction, editTodo as editTodoAction,
  countTodos as countTodoAction,
} from '../../Redux/actions';
import TodoEditor from '../editTodo/EditTodo';
import './Style.css';
import editIcon from '../../assets/icons/pencil-simple-line.png';
import deleteIcon from '../../assets/icons/trash.png';

class TodoTable extends Component {
  constructor() {
    super();
    this.state = {
      showEditTodo: false,
      todoToEdit: null,
      countTodosByStatus: 0,
    };
  }

  componentDidMount() {
    const { todos, countTodos } = this.props;
    const getCounter = countTodos(todos);
    this.setState({ countTodosByStatus: getCounter.payload });
  }

  componentDidUpdate(prevProps) {
    const { todos, countTodos } = this.props;
    if (prevProps.todos !== todos) {
      const getCounter = countTodos(todos);
      this.setState({ countTodosByStatus: getCounter.payload });
    }
  }

  renderTodos = (arr) => {
    const { showEditTodo, todoToEdit } = this.state;
    return (
      arr.map((todo) => (
        <ul key={todo.id}>
          <li className="ul-task">
            <label className="checkbox-icon" htmlFor={todo.id}>
              <input
                id={todo.id}
                type="checkbox"
                checked={todo.status === 'Done'}
                onChange={() => this.handleCheck(todo)}
              />
              <li className="icon" />
            </label>
            <span style={{
              textDecoration: todo.status === 'Done' ? 'line-through' : 'none',
              color: todo.status === 'Done' ? 'red' : 'black',
            }}
            >
              {todo.task}
            </span>
            <div className="btn-table-container">
              <button type="button" onClick={() => this.handleEdit(todo)}>
                <img src={editIcon} alt="edit-icon" width="20px" />
              </button>
              {/* renderiza o todoEditor apenas para a tarefa em edicao */}
              <button type="button" onClick={() => this.handleDelete(todo.id)}>
                <img src={deleteIcon} alt="delete-icon" width="20px" />
              </button>

            </div>
            { showEditTodo
            && todo.id === todoToEdit.id
            && (
              <div>
                <TodoEditor
                // passa a tarefa e a funcao para fechar o modal
                // a ser editada via prop. Optei por nao salvá-los no redux
                // por serem transmitidos apenas para o editTodo
                  todoToEdit={todoToEdit}
                  onClose={this.handleCloseModal}
                />
              </div>
            )}
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
    const newStatus = todo.status === 'Done' ? 'InProgress' : 'Done';
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
      case 'InProgress':
        return this.renderTodos(todos.filter((task) => task.status === 'InProgress'));
      case 'Done':
        return this.renderTodos(todos.filter((task) => task.status === 'Done'));
      default:
        return this.renderTodos(todos);
    }
  };

  render() {
    const { filter, countTodosByStatus } = this.state;
    return (
      <div>
        <section className="todo-type-container">
          <button
            type="button"
            onClick={() => this.setState({ filter: null })}
          >
            {`listar todas as tarefas (${countTodosByStatus.Total ? countTodosByStatus.Total : 0})`}
          </button>
          <button
            type="button"
            onClick={() => this.setState({ filter: 'InProgress' })}
          >
            {`listar tarefas a fazer (${countTodosByStatus.InProgress ? countTodosByStatus.InProgress : 0})`}
          </button>
          <button
            type="button"
            onClick={() => this.setState({ filter: 'Done' })}
          >
            {`listar tarefas a fazer (${countTodosByStatus.Done ? countTodosByStatus.Done : 0})`}
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
  countTodos: (todos) => dispatch(countTodoAction(todos)),
});

TodoTable.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      task: PropTypes.string.isRequired,
      status: PropTypes.oneOf(['InProgress', 'Done']).isRequired,
    }),
  ).isRequired,
  countTodos: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,

};
export default connect(mapStateToProps, mapDispatchToProps)(TodoTable);
