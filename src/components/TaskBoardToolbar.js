import React from 'react';
import { Input, Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { updateTaskBoardFilter, updateTaskBoardSortBy, loadTaskboard } from '../operations/taskBoardOperations';
import { selectCurrentProject } from '../store';

class TaskBoardToolbar extends React.PureComponent {
  render() {
    const { filter, project, updateTaskBoardFilter, updateTaskBoardSortBy, loadTaskboard } = this.props;
    const sortOptions = [
      { key: 1, text: 'Name', value: 'name' }
    ];
    const boardOptions = project.taskboards.map(board => {
      return { key: board, text: board, value: board };
    });
    return (
      <div style={{ marginBottom: 10, display: 'flex', justifyContent: 'space-evenly' }}>
        <Input
          icon="search"
          placeholder="Filter..."
          value={filter}
          onChange={(e, data) => updateTaskBoardFilter(data.value)}
        />
        <Dropdown
          placeholder="Sort by"
          clearable
          selection
          options={sortOptions}
          onChange={(e, data) => updateTaskBoardSortBy(data.value)}
        />
        <Dropdown
          placeholder="Select taskboard"
          clearable
          selection
          options={boardOptions}
          onChange={(e, data) => loadTaskboard(data.value)}
        />
      </div>
    );
  }
}

export default connect(state =>
  ({
    filter: state.taskboard.filter,
    project: selectCurrentProject(state)
  }),
{ updateTaskBoardFilter, updateTaskBoardSortBy, loadTaskboard }
)(TaskBoardToolbar);