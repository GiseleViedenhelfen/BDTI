import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import addIcon from '../../assets/icons/file-plus.png';
import { addTodo as addTodoAction } from '../../Redux/actions';
import './Style.css';

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

  componentDidMount() {
    const { todos } = this.props;
    if (todos.length > 0) {
      const copyTodo = [...todos];
      this.setState({ id: copyTodo.pop().id + 1 });
    }
  }

  componentDidUpdate(prevProps) {
    const { todos } = this.props;
    // compara se houve alterações no redux, caso tenha, registra no id
    if (prevProps.todos !== todos) {
      const copyTodo = [...todos];
      // checa se o array nao foi esvaziado por deletar todas as tasks
      const checkTodo = copyTodo.length > 0;
      // se estiver vazio, seta o id para 0, se n, segue a mesma ideia do didMount
      const newid = checkTodo ? copyTodo.pop().id + 1 : 0;
      this.setState({ id: newid });
    }
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
    addTodo({ id, task, status: 'InProgress' });
    //  zera o input ao clicar
    this.setState({ inputValue: '' });
  };

  render() {
    const {
      inputValue, btnDisable,
    } = this.state;
    return (
      <div>
        <form className="add-task-container">
          <input
            type="text"
            id="todo-input"
            placeholder="Adicione nova tarefa"
            value={inputValue}
            onChange={this.handleChange}
          />
          <button
            type="button"
            disabled={btnDisable}
            onClick={this.handleClick}
          >
            <img src={addIcon} alt="add-icon" width="25px" />
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  todos: state.todos,
});
const mapDispatchToProps = (dispatch) => ({
  addTodo: (newTodo) => dispatch(addTodoAction(newTodo)),
});
AddTodo.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      task: PropTypes.string.isRequired,
      status: PropTypes.oneOf(['InProgress', 'Done']).isRequired,
    }),
  ).isRequired,
  addTodo: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(AddTodo);
