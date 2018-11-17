import projectService from '../services/projects';
import move from 'lodash-move';
import Creators from '../actions/projectActions';

export const initProjects = () => {
  const selected = JSON.parse(localStorage.getItem('selectedProject'));
  return async (dispatch) => {
    const projects = await projectService.getAll();
    dispatch(Creators.initProjects(projects));
    if (selected) {
      dispatch(Creators.changeSelected(selected));
    }
  };
};

export const selectProject = (project) => {
  localStorage.setItem('selectedProject', JSON.stringify(project));
  return Creators.changeSelected(project);
};

export const updateProject = (project, save=true) => async dispatch => {
  const updatedProject = save ? await projectService.update(project) : project;
  dispatch(Creators.updateProject(updatedProject));
};

export const updateTaskBoard = ( method, project, task, boardInfo) => {
  switch (method) {
    case 'add': {
      return addTaskToBoard(project, task);
    }
    case 'remove': {
      return removeTaskFromBoard(project, task);
    }
    case 'update': {
      return updateTaskOnBoard(project, task, boardInfo);
    }
    default: return Creators.updateProject(project);
  }
};

const addTaskToBoard = (project, task) => async dispatch => {
  const taskBoard = {
    ...project.taskBoard,
    [task.status.id]: [ ...project.taskBoard[task.status.id], task.id ]
  };
  const updatedProject = await projectService.update({ ...project, taskBoard });
  dispatch(updateProject(updatedProject));
};

const removeTaskFromBoard = (project, task) => async dispatch => {
  const taskBoard = {
    ...project.taskBoard,
    [task.status.id]: project.taskBoard[task.status.id]
      .filter(taskId => taskId !== task.id)
  };
  const updatedProject = await projectService.update({ ...project, taskBoard });
  dispatch(updateProject(updatedProject));
};

const updateTaskOnBoard = (project, task, boardInfo) => async dispatch => {
  let updatedProject = {
    ...project,
    taskBoard: calculateTaskBoard(project.taskBoard, task, boardInfo)
  };
  dispatch(updateProject(updatedProject, false));
  updatedProject = await projectService.update(updatedProject);
  dispatch(updateProject(updatedProject));
};

/**
 * Calculates new taskboard when a taks's status is changed.
 * @param {object} taskBoard Current taskboard
 * @param {object} task Task to update
 * @param {object} boardInfo Information needed to calculate the new taskboad
 * @param {string} boardInfo.oldStatus Id of the orevious status
 * @param {string} boardInfo.newStatus Id of the new status
 * @param {number} boardInfo.sourceIndex Index in the previous column
 * @param {number} boardInfo.destinationIndex Index in the new column
 */
const calculateTaskBoard = (taskBoard, task, boardInfo) => {
  const { oldStatus, newStatus, sourceIndex, destinationIndex } = boardInfo;
  if (oldStatus !== newStatus) {
    return {
      ...taskBoard,
      [oldStatus]: taskBoard[oldStatus].filter((taskId) => taskId !== task.id),
      [newStatus]: [
        ...taskBoard[newStatus].slice(0, destinationIndex),
        task.id,
        ...taskBoard[newStatus].slice(destinationIndex)
      ]
    };
  } else {
    return {
      ...taskBoard,
      [oldStatus]: move(taskBoard[oldStatus], sourceIndex, destinationIndex)
    };
  }
};