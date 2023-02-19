import React from "react";
import { connect } from "react-redux";
import { editTodo } from '../../Redux/actions';

const TodoTable = ({ todos, editTodo }) => {

  const handleEdit = (todo) => {
    const editedTodo = {
      ...todo,
    //  status: 'editing',
    };
    editTodo(editedTodo);
  };

  const handleDelete = (id) => {
    // implementar ação de excluir tarefa
  };
  return(
    <table>
      <thead>
        <tr>
          <th>tarefa</th>
          <th>status atual</th>
          <th>editar</th>
          <th>excluir</th>
        </tr>
      </thead>
      <tbody>
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
      </tbody>
    </table>
  )
}

const mapStateToProps = (state) => {
  return {
    todos: state.todoReducer.todos,
  };
};
const mapDispatchToProps = {
  editTodo,
}
export default connect(mapStateToProps, mapDispatchToProps)(TodoTable);