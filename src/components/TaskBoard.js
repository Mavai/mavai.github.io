import React from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import StatusColumn from './StatusColumn';
import { changeTaskStatus } from '../operations/taskOperations';
import { initTaskboard } from '../operations/taskboardOperations';
import {
  selectTasksAsMap,
  selectCurrentProject,
  selectCurrentTaskboard,
  selectStatuses
} from '../store';
import Placeholder from './Placeholder';
import TaskboardToolbar from './TaskboardToolbar';

export class Taskboard extends React.PureComponent {
  componentDidMount = () => {
    if (!this.props.taskboard) {
      this.props.initTaskboard();
    }
  };

  onDragEnd = async result => {
    const { taskboard, tasks, changeTaskStatus } = this.props;
    if (!result.destination) return;
    const { droppableId: oldStatus, index: sourceIndex } = result.source;
    const {
      droppableId: newStatus,
      index: destinationIndex
    } = result.destination;
    const taskId = taskboard[oldStatus][sourceIndex];
    const task = tasks[taskId];
    const updatedTask = { ...task, status: newStatus };
    await changeTaskStatus(updatedTask, {
      oldStatus,
      newStatus,
      sourceIndex,
      destinationIndex
    });
  };

  render() {
    const { selectedProject, statuses, taskboard, tasks } = this.props;

    if (!selectedProject) return <Placeholder />;

    return (
      <div>
        <TaskboardToolbar />
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Grid columns={statuses.length || 1} stackable>
            {statuses.map(status => (
              <Grid.Column key={status.name}>
                <h1>{status.name}</h1>
                <Droppable droppableId={status.id}>
                  {provided => (
                    <div ref={provided.innerRef} style={{ minHeight: '100%' }}>
                      <StatusColumn
                        key={status.name}
                        tasks={tasks}
                        column={taskboard ? taskboard[status.id] : []}
                        status={status}
                      />
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

Taskboard.defaultProps = {
  statuses: [],
  taskboard: {}
};

export default connect(
  state => ({
    tasks: selectTasksAsMap(state),
    statuses: selectStatuses(state),
    selectedProject: selectCurrentProject(state),
    taskboard: selectCurrentTaskboard(state)
  }),
  { changeTaskStatus, initTaskboard }
)(Taskboard);
