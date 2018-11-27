import { sortBy } from 'lodash';

const initialState = [];
export const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INIT_TASKS':
      return action.tasks;
    case 'CREATE_TASK':
      return [...state, action.task];
    case 'UPDATE_TASK': {
      const filteredTasks = state.filter(task => task.id !== action.task.id);
      return [...filteredTasks, action.task];
    }
    case 'DELETE_TASK':
      return state.filter(task => task.id !== action.task.id);
    default:
      return state;
  }
};

export const selectTasksByStatus = (tasks, statuses) => {
  return statuses.map(status => ({
    status,
    tasks: tasks.filter(task => task.status.id === status.id)
  }));
};

export const selectTasksAsMap = tasks => {
  return tasks.length
    ? tasks.reduce(
        (obj, task) => ({
          ...obj,
          [task.id]: task
        }),
        {}
      )
    : null;
};

export const selectColumnTasks = (tasks, column, filterOptions) => {
  if (!tasks || !column) return [];
  let columnTasks = column.map(taskId => tasks[taskId]);
  if (filterOptions.filter) {
    columnTasks = columnTasks.filter(task =>
      task.name.includes(filterOptions.filter)
    );
  }
  if (filterOptions.sortBy) {
    columnTasks = sortBy(columnTasks, [filterOptions.sortBy]);
  }
  return columnTasks;
};

export default taskReducer;
