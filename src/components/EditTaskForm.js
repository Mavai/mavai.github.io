import React from 'react';
import { connect } from 'react-redux';
import { updateTask } from '../reducers/taskReducer';
import TaskForm from './TaskForm';

export class EditTaskForm extends React.PureComponent {

  onSubmit = formData => {
    const { task, updateTask } = this.props;
    let boardInfo = null;
    if (task.status.id !== formData.status) {
      boardInfo = {
        oldStatus: task.status.id,
        newStatus: formData.status,
        destinationIndex: Infinity
      };
    }
    updateTask({ ...task, ...formData, project: task.project.id }, true, boardInfo);
  }

  stopTaskEdit = task => {
    const { updateTask } = this.props;
    return () => updateTask({ ...task, editMode: false }, false);
  }

  render() {
    const { task } = this.props;
    return (
      <TaskForm onSubmit={this.onSubmit} onCancel={this.stopTaskEdit(task)} initialValues={task} />
    );
  }
}

export default connect(
  null,
  { updateTask }
)(EditTaskForm);