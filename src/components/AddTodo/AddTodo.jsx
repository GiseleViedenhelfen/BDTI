import React,{ Component } from "react";
import { connect } from "react-redux";
import { addTodo } from "../../Redux/actions";

class AddTodo extends Component {
  constructor() {
    super();
    // inicia os valores zerados
    this.state = {
      task: '',
      inputValue: ''
    };
  }

  handleChange = ({target}) => {
    //pega o valor do input
    const newTask =  target.value
    //salva no estado o valor do input e a nova task a ser colocada no estado global
    this.setState({
      inputValue: newTask,
      // adiciona o trim para nao salvar possiveis espacos vazios
      task: newTask.trim(),
    })
  }
  handleClick = () => {
    //pega o valor da task a ser salva
    const {task} = this.state;
    // pega a action via props
    const { addTodo } = this.props;
    // adiciona o valor da task no estado global
    addTodo(task);
    // uma vez salvo no estado global, limpa o input de texto
    this.setState({inputValue: ''})
  }

  render() {
    const { inputValue } = this.state;
    return(
    <form>
      <label htmlFor="todo-input">
        Tarefa:
        <input
          type="text"
          id="todo-input"
          value={ inputValue }
          onChange={ this.handleChange }
        />
      </label>

      <button type="button" onClick={this.handleClick}>
        Adicionar
      </button>
  </form>
    )
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (newTodo) => dispatch(addTodo(newTodo)),
  };
};

export default connect(null, mapDispatchToProps)(AddTodo);