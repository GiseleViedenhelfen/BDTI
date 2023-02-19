import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteTodo as deleteTodoAction } from '../../Redux/actions';
import TodoEditor from '../editTodo/EditTodo';

class TodoTable extends Component {
  constructor() {
    super();
    this.state = {
      showEditTodo: false,
      todoToEdit: null,
    };
  }

  handleEdit = (todo) => {
    this.setState((prevState) => ({
      showEditTodo: !prevState.showEditTodo,
      todoToEdit: todo,
    }));
  };

  handleCloseModal = () => {
    this.setState({
      showEditTodo: false,
      todoToEdit: null,
    });
  };

  handleDelete = (id) => {
    const { deleteTodo } = this.props;
    const confirmDelete = window
      .confirm('Tem certeza que deseja excluir esta tarefa?');
    if (confirmDelete) {
      deleteTodo(id);
    }
  };

  render() {
    const { showEditTodo, todoToEdit } = this.state;
    const { tasks } = this.props;
    return (
      <div>
        { tasks
      && tasks.map((todo) => (
        <ul key={todo.id}>
          <li>
            <span>{todo.task}</span>
            <span>{todo.status}</span>
            <button type="button" onClick={() => this.handleEdit(todo)}>
              Editar
            </button>
            { showEditTodo
            && (
            <TodoEditor
              todoToEdit={todoToEdit}
              onClose={this.handleCloseModal}
            />
            )}
            <button type="button" onClick={() => this.handleDelete(todo.id)}>
              Excluir
            </button>
          </li>
        </ul>
      ))}
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
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      task: PropTypes.string.isRequired,
      status: PropTypes.oneOf(['New', 'In-progress', 'Done']).isRequired,
    }),
  ).isRequired,
  deleteTodo: PropTypes.func.isRequired,

};
export default connect(mapStateToProps, mapDispatchToProps)(TodoTable);
