import React from 'react';
import { connect } from 'react-redux';
import { createTask } from '../../operations/taskOperations';
import Placeholder from '../Placeholder';
import TaskForm from './TaskForm';
import { selectCurrentProject } from '../../store';

export class NewTaskForm extends React.PureComponent {
  onSubmit = formData => {
    const { createTask, history } = this.props;
    createTask(formData, formData.taskboard);
    history.push('/');
  };

  render() {
    const { selectedProject } = this.props;

    if (!selectedProject) return <Placeholder />;

    return <TaskForm onSubmit={this.onSubmit} />;
  }
}

export default connect(
  state => ({
    selectedProject: selectCurrentProject(state)
  }),
  { createTask }
)(NewTaskForm);
