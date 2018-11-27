const initTasks = tasks => ({
  type: 'INIT_TASKS',
  tasks
});

const createTask = task => ({
  type: 'CREATE_TASK',
  task
});

const updateTask = task => ({
  type: 'UPDATE_TASK',
  task
});

const deleteTask = task => ({
  type: 'DELETE_TASK',
  task
});

export default {
  initTasks,
  createTask,
  updateTask,
  deleteTask
};
