import React,{ useState } from "react";
import { connect } from "react-redux";
import { addTodo } from "../../Redux/actions";
const AddTodo = ({ addTodo }) => {

  const [newTodo, setNewTodo] = useState('');
  const [inputValue, setInputValue] = useState('');

  const handleChange = ({target}) => {
    setInputValue(target.value);
    setNewTodo(target.value.trim())
  
  }

  const handleClick = () => {
    addTodo(newTodo);
    setInputValue('');
  };
return (
  <form>
    <label htmlFor="todo-input">
      Tarefa:
      <input
        type="text"
        id="todo-input"
        value={inputValue}
        onChange={ handleChange }
      />
    </label>

    <button type="button" onClick={handleClick}>
      Adicionar
    </button>
  </form>
)
}
const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (newTodo) => dispatch(addTodo(newTodo)),
  };
};

export default connect(null, mapDispatchToProps)(AddTodo);