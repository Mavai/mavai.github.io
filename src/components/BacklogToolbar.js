import React from 'react';
import { Input, Dropdown, Checkbox } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { toggleIncludeFromTaskboards } from '../operations/backlogOperations';
import { selectCurrentProject } from '../store';

class TaskboardToolbar extends React.PureComponent {
  render() {
    const { includeFromTaskboards, toggleIncludeFromTaskboards } = this.props;
    const sortOptions = [{ key: 1, text: 'Name', value: 'name' }];
    return (
      <div
        style={{
          marginBottom: 10,
          display: 'flex',
          justifyContent: 'space-evenly'
        }}
      >
        <Checkbox
          toggle
          label="Include tasks from taskboards."
          style={{ alignSelf: 'center' }}
          checked={includeFromTaskboards}
          onChange={toggleIncludeFromTaskboards}
        />
        <Input icon="search" placeholder="Filter..." />
        <Dropdown
          placeholder="Sort by"
          clearable
          selection
          options={sortOptions}
        />
      </div>
    );
  }
}

export default connect(
  state => ({
    boardId: state.taskboard.id,
    filter: state.taskboard.filter,
    project: selectCurrentProject(state),
    includeFromTaskboards: state.backlog.includeFromTaskboards
  }),
  { toggleIncludeFromTaskboards }
)(TaskboardToolbar);
