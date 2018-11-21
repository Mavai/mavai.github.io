import React from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import StatusColumn from './StatusColumn';
import { changeTaskStatus } from '../operations/taskOperations';
import {
  selectTasksAsMap,
  selectCurrentProject,
  selectCurrentTaskboard,
  selectStatuses
} from '../store';
import Placeholder from './Placeholder';
import TaskBoardToolbar from './TaskBoardToolbar';

export class TaskBoard extends React.PureComponent {

  onDragEnd = async result => {
    const { taskBoard, tasks, changeTaskStatus } = this.props;
    if (!result.destination) return;
    const { droppableId: oldStatus, index: sourceIndex } = result.source;
    const { droppableId: newStatus, index: destinationIndex } = result.destination;
    const taskId = taskBoard[oldStatus][sourceIndex];
    const task = tasks[taskId];
    const updatedTask = { ...task, status: newStatus };
    await changeTaskStatus(updatedTask, { oldStatus, newStatus, sourceIndex, destinationIndex });
  };

  render() {
    const { selectedProject, statuses, taskBoard, tasks } = this.props;

    if (!selectedProject) return (
      <Placeholder />
    );

    return (
      <div>
        <TaskBoardToolbar />
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Grid columns={statuses.length || 1} stackable>
            {statuses.map(status => (
              <Grid.Column key={status.name}>
                <h1>{status.name}</h1>
                <Droppable droppableId={status.id}>
                  {(provided) => (
                    <div ref={provided.innerRef} style={{ minHeight: '100%' }}>
                      <StatusColumn
                        key={status.name}
                        tasks={tasks}
                        column={taskBoard[status.id]}
                        status={status}/>
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </Grid.Column>
            ))}
          </Grid>
        </DragDropContext>
      </div>
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
    taskBoard: selectCurrentTaskboard(state)
  }),
{ changeTaskStatus }
)(TaskBoard);