import React from 'react';
import { Input } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { updateTaskBoardFilter } from '../operations/taskBoardOperations';

class TaskBoardToolbar extends React.PureComponent {
  render() {
    const { filter, updateTaskBoardFilter } = this.props;
    return (
      <div style={{ marginBottom: 10 }}>
        <Input
          icon="search"
          placeholder="Filter..."
          value={filter}
          onChange={(e) => updateTaskBoardFilter(e.target.value)}/>
      </div>
    );
  }
}

export default connect(state =>
  ({
    filter: state.taskBoard.filter
  }),
{ updateTaskBoardFilter }
)(TaskBoardToolbar);