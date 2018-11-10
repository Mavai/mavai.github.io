import React from 'react';
import { connect } from 'react-redux';
import { createTask } from '../reducers/taskReducer';
import Placeholder from './Placeholder';
import TaskForm from './TaskForm';
import { selectCurrent } from '../reducers/projectReducer';

export class NewTaskForm extends React.PureComponent {

  onSubmit = formData => {
    const { createTask, history } = this.props;
    createTask(formData);
    history.push('/');
  }

  render() {
    const { selectedProject } = this.props;

    if (!selectedProject) return (
      <Placeholder />
    );

    return (
      <TaskForm onSubmit={this.onSubmit} />
    );
  }
}

export default connect(state =>
  ({
    selectedProject: selectCurrent(state)
  }),
{ createTask }
)(NewTaskForm);