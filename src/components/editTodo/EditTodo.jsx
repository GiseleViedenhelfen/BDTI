import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editTodo as editTodoAction } from '../../Redux/actions';

class TodoEditor extends Component {
  constructor(props) {
    super(props);

    const {
      id,
      task,
      status,
    } = props.todoToEdit;
    this.state = {
      id,
      task,
      status,
      inputValue: task,
    };
  }

  componentDidMount() {
  }

  handleChange = ({ target }) => {
    // pega o valor do input
    const newTask = target.value;
    // salva no estado o valor do input e a task a ser colocada no estado global
    this.setState({
      inputValue: newTask,
      // adiciona o trim para nao salvar possiveis espacos vazios
      task: newTask.trim(),
    });
  };

  // handleStatusChange = ({ target }) => {
  //   this.setState({ status: target.value });
  // };

  handleClick = () => {
    // pega o valor da task a ser salva
    const {
      id, task, status,
    } = this.state;
    // pega a action via props e a funcao para fechar o modal quando
    // terminar de editar a tarefa
    const { onClose, editTodo } = this.props;
    // adiciona o valor da task no estado global se for uma tarefa nova,
    // chama a action addTodo, se nao chama a editTodo
    // const newId = id + 1;
    editTodo({ id, task, status });
    onClose();
  };

  render() {
    const {
      inputValue,
      // status,
    } = this.state;
    return (
      <div className="modal">
        <h2>Editar Tarefa</h2>
        <form>
          <label htmlFor="todo-input">
            Tarefa:
            <input
              type="text"
              id="todo-input"
              value={inputValue}
              onChange={this.handleChange}
            />
          </label>
          {/* <select value={status} onChange={this.handleStatusChange}>
            <option value="In-progress">Em andamento</option>
            <option value="Done">Finalizada</option>
          </select> */}
          <button type="button" onClick={this.handleClick}>
            Adicionar
          </button>
        </form>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  editTodo: (newTodo) => dispatch(editTodoAction(newTodo)),
});
TodoEditor.propTypes = {
  editTodo: PropTypes.func.isRequired,
  todoToEdit: PropTypes.shape({
    id: PropTypes.number.isRequired,
    task: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['In-progress', 'Done']).isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};
export default connect(null, mapDispatchToProps)(TodoEditor);
