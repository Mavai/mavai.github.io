import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import Task from './Task';
import { connect } from 'react-redux';
import { removeTask, updateTask } from '../operations/taskOperations';
import { selectCurrentProject } from '../store';
import { selectColumnTasks } from '../reducers/taskReducer';
import EditTaskModal from './EditTaskModal';

export class StatusColumn extends React.PureComponent {
  render() {
    const {
      tasks,
      column,
      filter,
      sortBy,
      removeTask,
      updateTask,
      hideItems
    } = this.props;
    const columnTasks = selectColumnTasks(tasks, column, { filter, sortBy });

    return (
      <div>
        <div>
          {columnTasks.map(
            (task, index) =>
              task && (
                <div className="draggable-task" key={task.id}>
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        key={task.id}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Task
                          task={task}
                          removeTask={removeTask}
                          updateTask={updateTask}
                          hide={!snapshot.isDragging && hideItems}
                        />
                        <EditTaskModal task={task} />
                      </div>
                    )}
                  </Draggable>
                </div>
              )
          )}
        </div>
      </div>
    );
  }
}

StatusColumn.defaultProps = {
  tasks: [],
  status: {}
};

export default connect(
  state => ({
    selectedProject: selectCurrentProject(state),
    filter: state.taskboard.filter,
    sortBy: state.taskboard.sortBy
  }),
  { removeTask, updateTask }
)(StatusColumn);
