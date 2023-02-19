import React,{ Component } from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { addTodo, editTodo } from "../../Redux/actions";
import TodoForm from "../todoForm/TodoForm";

class TodoEditor extends Component {
  constructor(props) {
    super(props);
    // inicia os valores vindos da tarefa selecionada
    const {
      id,
      task,
      status
    } = props.todoToEdit || { id: 0, task: "", status: "New" };
    this.state = {
      id,
      task,
      status,
      inputValue: task,
      // caso a tarefa estaja sendo criada, usa o segundo objeto
      isNew: !props.todoToEdit,
    };
  }

  handleChange = ({target}) => {
    //pega o valor do input
    const newTask =  target.value
    //salva no estado o valor do input e a task a ser colocada no estado global
    this.setState({
      inputValue: newTask,
      // adiciona o trim para nao salvar possiveis espacos vazios
      task: newTask.trim(),
    })
  }
  handleStatusChange = ({target}) => {
    this.setState({ status: target.value });
  }
  handleClick = () => {
    //pega o valor da task a ser salva
    const {task,status, id, isNew } = this.state;
    // pega a action via props e a funcao para fechar o modal quando
    // terminar de editar a tarefa
    const { addTodo, editTodo, onClose } = this.props;
    // adiciona o valor da task no estado global se for uma tarefa nova,
    // chama a action addTodo, se nao chama a editTodo
    const action = isNew ? addTodo : editTodo;
    action({ id, task, status });
    // sendo uma task nova, limpará o input e adiciona +1 ao id
    if (isNew) {
      this.setState({ id: id + 1, inputValue: "", status: "New" });
    }
    onClose()
  }

  render() {
    const { inputValue, status, isNew } = this.state;
    const title = isNew ? "Adicionar Tarefa" : "Editar Tarefa";
    return(
      <div>
        <h2>{title}</h2>
        <TodoForm
          status={status}
          inputValue={inputValue}
          handleChange = {this.handleChange}
          handleClick={this.handleClick}
          handleStatusChange={this.handleStatusChange}
        />
      </div>
    )
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (newTodo) => dispatch(addTodo(newTodo)),
    editTodo: (newTodo) => dispatch(editTodo(newTodo)),
  };
};
TodoEditor.propTypes = {
  addTodo: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
  todoToEdit: PropTypes.shape({
    id: PropTypes.number.isRequired,
    task: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['New', 'In-progress', 'Done']).isRequired
  }),
  onClose: PropTypes.func.isRequired,
};
export default connect(null, mapDispatchToProps)(TodoEditor);