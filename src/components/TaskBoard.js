import React from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import StatusColumn from './StatusColumn';
import { changeTaskStatus, selectTasksAsMap } from '../reducers/taskReducer';
import Placeholder from './Placeholder';
import { selectTaskBoard, selectCurrentProject } from '../reducers/projectReducer';
import { selectStatuses } from '../reducers/statusReducer';


export class TaskBoard extends React.PureComponent {

  onDragEnd = async result => {
    const { taskBoard, tasks, changeTaskStatus } = this.props;
    if (!result.destination) return;
    const { droppableId: oldStatus, index: sourceIndex } = result.source;
    const { droppableId: newStatus, index: destinationIndex } = result.destination;
    const taskId = taskBoard[oldStatus][sourceIndex];
    const task = tasks[taskId];
    const updatedTask = { ...task, status: newStatus, project: task.project.id };
    await changeTaskStatus(updatedTask, { oldStatus, newStatus, sourceIndex, destinationIndex });
  };

  getColumnTasks = (column = []) => {
    const { tasks } = this.props;
    if (!tasks) return [];
    return column.map(taskId => tasks[taskId]);
  };

  render() {
    const { selectedProject, statuses, taskBoard } = this.props;

    if (!selectedProject) return (
      <Placeholder />
    );

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Grid columns={statuses.length || 1} stackable>
          {statuses.map(status => (
            <StatusColumn
              key={status.name}
              tasks={this.getColumnTasks(taskBoard[status.id])}
              status={status}/>
          ))}
        </Grid>
      </DragDropContext>
    );
  }
}

TaskBoard.defaultProps = {
  statuses: [],
  taskBoard: {}
};

export default connect(state =>
  ({
    tasks: selectTasksAsMap(state),
    statuses: selectStatuses(state),
    selectedProject: selectCurrentProject(state),
    taskBoard: selectTaskBoard(state)
  }),
{ changeTaskStatus }
)(TaskBoard);