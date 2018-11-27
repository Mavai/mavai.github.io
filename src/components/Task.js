import React from 'react';
import { Card } from 'semantic-ui-react';
import TaskControls from './TaskControls';
import moment from 'moment';

class Task extends React.PureComponent {
  updateTask = () => {
    const { task, updateTask } = this.props;
    updateTask({ ...task, editMode: true }, false);
  };

  removeTask = () => {
    const { task, removeTask } = this.props;
    removeTask(task);
  };

  render() {
    const { task } = this.props;

    return (
      <Card fluid style={{ marginBottom: 10 }}>
        <Card.Content>
          <Card.Header>{task.name}</Card.Header>
          <Card.Content>
            <Card.Description>{task.description}</Card.Description>
          </Card.Content>
          <Card.Content extra style={{ color: 'gray' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between'
              }}
            >
              <div>{moment(task.updatedAt).format('DD.MM.YYYY')}</div>
              <TaskControls
                removeTask={this.removeTask}
                editTask={this.updateTask}
              />
            </div>
          </Card.Content>
        </Card.Content>
      </Card>
    );
  }
}

Task.defaultProps = {
  task: {}
};

export default Task;
