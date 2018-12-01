import taskService from '../services/tasks';
import {
  addTaskToBoard,
  removeTaskFromBoard,
  updateTaskOnBoard
} from '../operations/taskboardOperations';
import { selectCurrentProject } from '../store';
import Creators from '../actions/taskActions';

/**
 * Fetch all tasks from the given project.
 * @param {number} id Id of project whose tasks will be fetched
 */
export const initTasks = id => {
  return async dispatch => {
    try {
      const tasks = await taskService.getAllFromProject(id);
      dispatch(Creators.initTasks(tasks));
    } catch (exception) {
      console.warn('Error when fetching tasks', exception);
    }
  };
};

/**
 * Create a new task and update current project's taskboard.
 * @param {object} newTask Task to create
 */
export const createTask = (newTask, taskboardId) => async (
  dispatch,
  getState
) => {
  const selectedProject = selectCurrentProject(getState());
  try {
    const task = await taskService.createNew({
      ...newTask,
      project: selectedProject.id
    });
    try {
      await dispatch(addTaskToBoard(task, taskboardId));
      dispatch(Creators.createTask(task));
    } catch (exception) {
      taskService.deleteTask(task);
    }
  } catch (exception) {
    console.warn('Error when creating a task', exception);
  }
};

/**
 * Update the given task.
 * @param {object} updatedTask Task to update
 */
export const updateTask = (
  updatedTask,
  save = true,
  boardInfo
) => async dispatch => {
  try {
    const task = save ? await taskService.update(updatedTask) : updatedTask;
    dispatch(Creators.updateTask(task));
    if (boardInfo) {
      try {
        await dispatch(updateTaskOnBoard(task, boardInfo));
      } catch (exception) {
        await taskService.update({ ...task, status: boardInfo.oldStatus });
        dispatch(Creators.updateTask({ ...task, status: boardInfo.oldStatus }));
      }
    }
  } catch (exception) {
    console.warn('Error when updating a task', exception);
  }
};

/**
 * Change status of a task and update current project's taskboard.
 * @param {object} task Task to update
 */
export const changeTaskStatus = (task, boardInfo) => async dispatch => {
  try {
    dispatch(updateTask(task));
    try {
      dispatch(updateTaskOnBoard(task, boardInfo));
    } catch (exception) {
      const oldTask = { ...task, status: boardInfo.oldStatus };
      taskService.update(oldTask);
      Creators.updateTask(oldTask);
    }
  } catch (exception) {
    console.warn('Error when changing task status', exception);
  }
};

/**
 * Remove the given task and update currently selected project's taskboard.
 * @param {object} task Task to remove.
 */
export const removeTask = (task, updateTaskboard = true) => {
  return async dispatch => {
    try {
      await taskService.remove(task);
      if (updateTaskboard) {
        await dispatch(removeTaskFromBoard(task));
      }
      dispatch(Creators.deleteTask(task));
    } catch (exception) {
      console.warn('Error when removing a task', exception);
    }
  };
};
