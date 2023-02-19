import React, { Component } from "react";
import PropTypes from 'prop-types';

class TodoForm extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      status,
      inputValue,
      handleChange,
      handleStatusChange,
      handleClick,
    } = this.props
    return (
    <form>
      <label htmlFor="todo-input">
        Tarefa:
        <input
          type="text"
          id="todo-input"
          value={ inputValue }
          onChange={ handleChange }
        />
      </label>
      <select value={status} onChange={handleStatusChange}>
        <option value="New">Inicial</option>
        <option value="In-progress">Em andamento</option>
        <option value="Done">Finalizada</option>
      </select>
      <button type="button" onClick={handleClick}>
        Adicionar
      </button>
    </form>
    )
  }
}
TodoForm.propTypes = {
  status: PropTypes.string.isRequired,
  inputValue: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleStatusChange: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
};
export default TodoForm;