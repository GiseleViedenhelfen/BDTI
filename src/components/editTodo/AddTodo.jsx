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
    const {
      task, id,
    } = this.state;
    // pega a action via props e a funcao para fechar o modal quando
    // terminar de editar a tarefa
    const { addTodo } = this.props;
    // adiciona o valor da task no estado global, chamando a action addTodo
    // e cria as novas tarefas com o status em andamento
    addTodo({ id, task, status: 'In-progress' });
    // atualiza o valor do id e zera o input
    this.setState({ id: id + 1, inputValue: '' });
  };

  render() {
    const {
      inputValue, btnDisable,
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
          <button
            type="button"
            disabled={btnDisable}
            onClick={this.handleClick}
          >
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
};
export default connect(null, mapDispatchToProps)(AddTodo);
