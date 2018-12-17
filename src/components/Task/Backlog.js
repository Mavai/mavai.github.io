import React from 'react';
import { connect } from 'react-redux';
import { List } from 'semantic-ui-react';
import moment from 'moment';
import BacklogToolbar from './BacklogToolbar';

class Backlog extends React.PureComponent {
  render = () => {
    const { tasks, includeFromTaskboards } = this.props;
    const filteredTasks = includeFromTaskboards
      ? tasks
      : tasks.filter(task => !task.taskboard);
    console.log(includeFromTaskboards);
    return (
      <div>
        <BacklogToolbar />
        <List celled relaxed>
          {filteredTasks.map(task => (
            <List.Item key={task.id}>
              <List.Header as="h3">{task.name}</List.Header>
              <List.Description>{task.description}</List.Description>
              <List.Description>
                {`Updated at: ${moment(task.updatedAt).format('DD.MM.YYYY')}`}
              </List.Description>
            </List.Item>
          ))}
        </List>
      </div>
    );
  };
}

export default connect(
  state => ({
    tasks: state.tasks,
    includeFromTaskboards: state.backlog.includeFromTaskboards
  }),
  null
)(Backlog);
