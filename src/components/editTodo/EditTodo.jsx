import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editTodo as editTodoAction } from '../../Redux/actions';
import arrowLeft from '../../assets/icons/arrow-elbow-down-left.png';
import saveIcon from '../../assets/icons/file-plus.png';

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
      btnDisable: true,
    };
  }

  handleChange = ({ target }) => {
    // pega o valor do input
    const newTask = target.value;
    // adiciona o trim para nao salvar possiveis espacos vazios
    const trimNewTask = newTask.trim();
    // verifica se o input está vazio, se estiver, ele fica desabilitado
    const checkTaskLength = trimNewTask.length === 0;
    // salva no estado o valor do input e a task a ser colocada no estado global
    this.setState({
      inputValue: newTask,
      task: trimNewTask,
      btnDisable: checkTaskLength,
    });
  };

  handleClick = () => {
    // pega o valor da task a ser salva
    const { id, task, status } = this.state;
    // pega a action via props e a funcao para fechar o modal quando
    // terminar de editar a tarefa
    const { onClose, editTodo } = this.props;
    // adiciona o valor da task no estado global chamando a editTodo
    editTodo({ id, task, status });
    // fecha o modal uma vez confirmada a edicao
    onClose();
  };

  render() {
    const { inputValue, btnDisable } = this.state;
    return (
      <div className="overlay">
        <div className="popup">
          <form>
            <label htmlFor="todo-edit-input">
              <input
                type="text"
                id="todo-edit-input"
                placeholder="Caso desista de editar, use a seta para voltar"
                value={inputValue}
                onChange={this.handleChange}
              />
            </label>
            <div className="edit-btn-container">
              <button
                disabled={btnDisable}
                type="button"
                onClick={this.handleClick}
              >
                <img src={saveIcon} alt="save-icon" width="20px" />
              </button>

              { btnDisable
          && (
          // adiciona botao para retornar caso nao queira mais editar a tarefa
          <button
            type="button"
            onClick={this.handleClick}
          >
            <img src={arrowLeft} alt="arrow-icon" width="20px" />
          </button>
          )}
            </div>
          </form>
        </div>
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
    status: PropTypes.oneOf(['InProgress', 'Done']).isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};
export default connect(null, mapDispatchToProps)(TodoEditor);
