import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addTodo as addTodoAction } from '../../Redux/actions';

class AddTodo extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      task: '',
      inputValue: '',
    };
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
  //   // atualiza o input de status
  //   this.setState({ status: target.value });
  // };

  handleClick = () => {
    const {
      task, id,
    } = this.state;
    // pega a action via props e a funcao para fechar o modal quando
    // terminar de editar a tarefa
    const { addTodo, onClose } = this.props;
    // adiciona o valor da task no estado global, chamando a action addTodo
    // e cria as novas tarefas com o status de nova
    addTodo({ id, task, status: 'New' });
    // atualiza o valor do id
    this.setState({ id: id + 1 });
    onClose();
  };

  render() {
    const {
      inputValue,
    } = this.state;
    return (
      <div className="modal">
        <h2>Adicionar Tarefa</h2>
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
          <button type="button" onClick={this.handleClick}>
            Adicionar
          </button>
        </form>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  addTodo: (newTodo) => dispatch(addTodoAction(newTodo)),
});
AddTodo.propTypes = {
  addTodo: PropTypes.func.isRequired,
  todos: PropTypes.shape({
    id: PropTypes.number.isRequired,
    task: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['New', 'In-progress', 'Done']).isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};
export default connect(null, mapDispatchToProps)(AddTodo);
