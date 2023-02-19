import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TodoTable from './TodoTable';

class FilterByStatus extends Component {
  constructor() {
    super();
    this.state = {
      tasksToShow: [],
    };
  }

  handleAllTodos = () => {
    const { todos } = this.props;
    this.setState({ tasksToShow: todos });
  };

  handleDone = () => {
    const { todos } = this.props;
    const getDoneTasks = todos.filter((task) => task.status === 'Done');
    this.setState({ tasksToShow: getDoneTasks });
  };

  handleDoing = () => {
    const { todos } = this.props;
    const getonGoingTasks = todos.filter((task) => task.status === 'In-progress');
    this.setState({ tasksToShow: getonGoingTasks });
  };

  render() {
    const { tasksToShow } = this.state;
    return (
      <section>
        <button
          type="button"
          onClick={this.handleAllTodos}
        >
          listar todas as tarefas
        </button>
        <button
          type="button"
          onClick={this.handleDoing}
        >
          listar tarefas a fazer

        </button>
        <button
          type="button"
          onClick={this.handleDone}
        >
          listar tarefas concluídas
        </button>
        <TodoTable tasks={tasksToShow} />
      </section>
    );
  }
}
const mapStateToProps = (state) => ({
  todos: state.todos,
});
FilterByStatus.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      task: PropTypes.string.isRequired,
      status: PropTypes.oneOf(['New', 'In-progress', 'Done']).isRequired,
    }),
  ).isRequired,
};

export default connect(mapStateToProps, null)(FilterByStatus);
