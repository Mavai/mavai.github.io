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
  selectCurrentLayout,
  selectStatuses,
  taskboardHasFiltersActive
} from '../store';
import Placeholder from './Placeholder';
import TaskboardToolbar from './TaskboardToolbar';

export class Taskboard extends React.PureComponent {
  componentDidMount = () => {
    if (!this.props.layout) {
      this.props.initTaskboard();
    }
  };

  onDragEnd = async result => {
    console.log(result);
    const {
      layout,
      tasks,
      taskboardHasFiltersActive,
      changeTaskStatus
    } = this.props;
    if (!result.destination) return;
    const { droppableId: oldStatus, index: sourceIndex } = result.source;
    const {
      droppableId: newStatus,
      index: destinationIndex
    } = result.destination;
    const taskId = layout[oldStatus][sourceIndex];
    const task = tasks[taskId];
    const updatedTask = { ...task, status: newStatus };
    await changeTaskStatus(updatedTask, {
      oldStatus,
      newStatus,
      sourceIndex,
      destinationIndex: taskboardHasFiltersActive ? Infinity : destinationIndex
    });
  };

  render() {
    const {
      selectedProject,
      statuses,
      layout,
      tasks,
      taskboardHasFiltersActive
    } = this.props;

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
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      style={{
                        minHeight: '100%',
                        padding: 5,
                        backgroundColor: snapshot.isDraggingOver
                          ? 'lightsalmon'
                          : 'lightblue'
                      }}
                    >
                      <StatusColumn
                        key={status.name}
                        tasks={tasks}
                        column={layout ? layout[status.id] : []}
                        status={status}
                        hideItems={
                          taskboardHasFiltersActive && snapshot.isDraggingOver
                        }
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
    layout: selectCurrentLayout(state),
    taskboardHasFiltersActive: taskboardHasFiltersActive(state)
  }),
  { changeTaskStatus, initTaskboard }
)(Taskboard);
