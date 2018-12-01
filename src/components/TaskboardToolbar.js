import React from 'react';
import { Input, Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux';
import {
  updateTaskboardFilter,
  updateTaskboardSortBy,
  loadTaskboard
} from '../operations/taskboardOperations';
import { selectCurrentProject } from '../store';

class TaskboardToolbar extends React.PureComponent {
  render() {
    const {
      filter,
      project,
      boardId,
      updateTaskboardFilter,
      updateTaskboardSortBy,
      loadTaskboard
    } = this.props;
    const sortOptions = [{ key: 1, text: 'Name', value: 'name' }];
    const boardOptions = project.taskboards.map(taskboard => {
      return { key: taskboard.id, text: taskboard.name, value: taskboard.id };
    });
    return (
      <div
        style={{
          marginBottom: 10,
          display: 'flex',
          justifyContent: 'space-evenly'
        }}
      >
        <Input
          icon="search"
          placeholder="Filter..."
          value={filter}
          onChange={(e, data) => updateTaskboardFilter(data.value)}
        />
        <Dropdown
          placeholder="Sort by"
          clearable
          selection
          options={sortOptions}
          onChange={(e, data) => updateTaskboardSortBy(data.value)}
        />
        <Dropdown
          placeholder="Select taskboard"
          clearable
          selection
          value={boardId}
          options={boardOptions}
          onChange={(e, data) => loadTaskboard(data.value)}
        />
      </div>
    );
  }
}

export default connect(
  state => ({
    boardId: state.taskboard.id,
    filter: state.taskboard.filter,
    project: selectCurrentProject(state)
  }),
  { updateTaskboardFilter, updateTaskboardSortBy, loadTaskboard }
)(TaskboardToolbar);
