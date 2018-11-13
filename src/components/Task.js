import React from 'react';
import { Card } from 'semantic-ui-react';
import TaskControls from './TaskControls';

class Task extends React.PureComponent {
  updateTask = () => {
    const { task, updateTask } = this.props;
    updateTask({ ...task, editMode: true }, false);
  }

  removeTask = () => {
    const { task, removeTask } = this.props;
    removeTask(task);
  }

  render() {
    const { task } = this.props;

    return (
      <Card fluid style={{ marginBottom: 10 }}>
        <Card.Content>
          <Card.Header>{task.name}</Card.Header>
          <div>
            <Card.Description>{task.description}</Card.Description>
            <TaskControls
              removeTask={this.removeTask}
              editTask={this.updateTask}
            />
          </div>
        </Card.Content>
      </Card>
    );
  }
}

Task.defaultProps = {
  task: {}
};

export default Task;