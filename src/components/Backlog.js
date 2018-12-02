import React from 'react';
import { connect } from 'react-redux';
import { List } from 'semantic-ui-react';
import moment from 'moment';

class Backlog extends React.PureComponent {
  render = () => {
    const { tasks } = this.props;
    return (
      <div>
        <List celled relaxed>
          {tasks.map(task => (
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
    tasks: state.tasks
  }),
  null
)(Backlog);
