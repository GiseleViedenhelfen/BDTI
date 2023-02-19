import React from "react";
import { connect } from "react-redux";
// import { editTodo } from '../../Redux/actions';

const TodoTable = () => {
  // const { todos } = this.props;
  // console.log(todos)
  const handleEdit = (todo) => {
   
    console.log(`edita a tarefa ${todo}`)
  };

  const handleDelete = (id) => {
    console.log(`exclui a tarefa ${id}`)
  };
  return(
    <ul>
      <li>
        { todos.map((todo) => (
          <tr key={todo.id}>
            <td>{todo.task}</td>
            <td>{todo.status}</td>
            <td>
              <button onClick={() => handleEdit(todo)}>
                Editar
              </button>
            </td>
            <td>
              <button onClick={() => handleDelete(todo.id)}>
                Excluir
              </button>
            </td>
          </tr>
        ))}
      </li>
    </ul>
  )
}

const mapStateToProps = (state) => {
  return {
    todos: state.todoReducer.todos,
  };
};
const mapDispatchToProps = {
  todos: todoReducer.todos,
}
export default connect(mapStateToProps, mapDispatchToProps)(TodoTable);