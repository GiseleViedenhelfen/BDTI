import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { editTodo, deleteTodo } from '../../Redux/actions';

class TodoTable extends Component {
constructor() {
  super();
  this.state = {}
}
handleEdit = (todo) => {
   
  console.log(`edita a tarefa ${todo.task}`)
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
