import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import Task from './Task';
import { connect } from 'react-redux';
import { removeTask, updateTask } from '../operations/taskOperations';
import { selectCurrentProject } from '../store';
import EditTaskModal from './EditTaskModal';

export class StatusColumn extends React.PureComponent {
  render () {
    const { tasks, removeTask, updateTask } = this.props;

    return (
      <div>
        <div>
          {tasks.map((task, index) =>
            task &&
          <div className='draggable-task' key={task.id}>
            <Draggable key={task.id} draggableId={task.id} index={index}>
              {(provided) => (
                <div
                  key={task.id}
                  ref={provided.innerRef}
                  { ...provided.draggableProps }
                  { ...provided.dragHandleProps }
                >
                  <Task task={task} removeTask={removeTask} updateTask={updateTask} />
                  <EditTaskModal task={task} />
                </div>
              )}
            </Draggable>
          </div>
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

export default connect(state =>
  ({
    selectedProject: selectCurrentProject(state)
  }),
{ removeTask, updateTask }
)(StatusColumn);