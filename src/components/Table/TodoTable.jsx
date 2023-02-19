import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { editTodo, deleteTodo } from '../../Redux/actions';
import TodoEditor from "../editTodo/EditTodo";

class TodoTable extends Component {
constructor() {
  super();
  this.state = {
    showEditTodo: false,
    todoToEdit: null,
  }
}
handleEdit = (todo) => {
  this.setState({
    showEditTodo: !this.state.showEditTodo, 
    todoToEdit: todo });
  console.log(`edita a tarefa ${todo.task}`)
};

handleCloseModal = () => {
  this.setState({
    showEditTodo: false,
    todoToEdit: null,
  });
};

handleDelete = (id) => {
  console.log(`exclui a tarefa ${id}`)
  const confirmDelete = window
    .confirm("Tem certeza que deseja excluir esta tarefa?");
  if (confirmDelete) {
    this.props.deleteTodo(id);
  }
};

render() {
  const {showEditTodo, todoToEdit } = this.state;
  const { todos } = this.props;
  return(
    <div>
      { todos &&
      todos.map((todo) => (
        <ul key={todo.id}>
          <li>
            <span>{todo.task}</span>
            <span>{todo.status}</span>
            <button onClick={() => this.handleEdit(todo)}>
              Editar
            </button>
            { showEditTodo
            && 
            <TodoEditor
              todoToEdit={todoToEdit}
              onClose={this.handleCloseModal}
            /> 
            }
            <button onClick={() => this.handleDelete(todo.id)}>
              Excluir
            </button>
          </li>
        </ul>
      ))
    }
    </div>
  )
}
}


const mapStateToProps = (state) => {
  console.log(state)
  return {
    todos: state.todos,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    editTodo: (todo) => dispatch(editTodo(todo)),
    deleteTodo: (id) => dispatch(deleteTodo(id))
  }
}

TodoTable.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      task: PropTypes.string.isRequired,
      status: PropTypes.oneOf(['New', 'In-progress', 'Done']).isRequired
    })
  ).isRequired,
  deleteTodo: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,

};
export default connect(mapStateToProps, mapDispatchToProps)(TodoTable);
