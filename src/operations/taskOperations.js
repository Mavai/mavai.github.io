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
    const tasks = await taskService.getAllFromProject(id);
    dispatch(Creators.initTasks(tasks));
  };
};

/**
 * Create a new task and update current project's taskboard.
 * @param {object} newTask Task to create
 */
export const createTask = newTask => async (dispatch, getState) => {
  const selectedProject = selectCurrentProject(getState());
  try {
    const task = await taskService.createNew({
      ...newTask,
      project: selectedProject.id
    });
    dispatch(Creators.createTask(task));
    dispatch(addTaskToBoard(task));
  } catch (exception) {
    console.warn(exception);
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
  const task = save ? await taskService.update(updatedTask) : updatedTask;
  dispatch(Creators.updateTask(task));
  if (boardInfo) {
    dispatch(updateTaskOnBoard(task, boardInfo));
  }
};

/**
 * Change status of a task and update current project's taskboard.
 * @param {object} task Task to update
 */
export const changeTaskStatus = (task, boardInfo) => async dispatch => {
  dispatch(updateTask(task));
  dispatch(updateTaskOnBoard(task, boardInfo));
};

/**
 * Remove the given task and update currently selected project's taskboard.
 * @param {object} task Task to remove.
 */
export const removeTask = (task, updateTaskboard = true) => {
  return async dispatch => {
    await taskService.remove(task);
    dispatch(Creators.deleteTask(task));
    if (updateTaskboard) {
      dispatch(removeTaskFromBoard(task));
    }
  };
};
