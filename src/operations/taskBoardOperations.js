import Creators from '../actions/taskboardActions';
import taskboardService from '../services/taskboard';
import move from 'lodash-move';

export const initTaskboard = () => async dispatch => {
  const savedBoard = localStorage.getItem('currentBoard');
  const taskboard = await taskboardService.getOne(savedBoard);
  dispatch(Creators.initTaskboard(taskboard));
};
export const updateTaskboardFilter = filter => {
  return Creators.updateTaskboardFilter(filter);
};

export const updateTaskboardSortBy = sortBy => {
  return Creators.updateTaskboardSortBy(sortBy);
};

export const loadTaskboard = id => async dispatch => {
  if (!id) {
    dispatch(Creators.initTaskboard(null));
  } else {
    const taskboard = await taskboardService.getOne(id);
    dispatch(Creators.initTaskboard(taskboard));
    localStorage.setItem('currentBoard', taskboard.id);
  }
};

export const addTaskToBoard = (task, taskboardId) => async (
  dispatch,
  getState
) => {
  try {
    let currentTaskboard;
    if (taskboardId) {
      currentTaskboard = await taskboardService.getOne(taskboardId);
    } else {
      currentTaskboard = getState().taskboard;
    }
    const layout = {
      ...currentTaskboard.layout,
      [task.status.id]: [...currentTaskboard.layout[task.status.id], task.id]
    };
    const updatedTaskboard = await taskboardService.update({
      ...currentTaskboard,
      layout
    });
    dispatch(Creators.updateTaskboardLayout(updatedTaskboard.layout));
  } catch (excpetion) {
    console.warn('Error when adding a task to a taskboard', excpetion);
  }
};

export const removeTaskFromBoard = task => async (dispatch, getState) => {
  const currentTaskboard = getState().taskboard;
  const layout = {
    ...currentTaskboard.layout,
    [task.status.id]: currentTaskboard.layout[task.status.id].filter(
      taskId => taskId !== task.id
    )
  };
  const updatedTaskboard = await taskboardService.update({
    ...currentTaskboard,
    layout
  });
  dispatch(Creators.updateTaskboardLayout(updatedTaskboard.layout));
};

export const updateTaskOnBoard = (task, boardInfo) => async (
  dispatch,
  getState
) => {
  try {
    const currentTaskboard = getState().taskboard;
    let layout = calculateLayout(currentTaskboard.layout, task, boardInfo);
    dispatch(Creators.updateTaskboardLayout(layout));
    await taskboardService.update({ ...currentTaskboard, layout });
  } catch (excpetion) {
    console.warn('Error when updating a taskboard', excpetion);
  }
};

/**
 * Calculates new layout when a taks's status is changed.
 * @param {object} layout Current layout
 * @param {object} task Task to update
 * @param {object} boardInfo Information needed to calculate the new taskboad
 * @param {string} boardInfo.oldStatus Id of the orevious status
 * @param {string} boardInfo.newStatus Id of the new status
 * @param {number} boardInfo.sourceIndex Index in the previous column
 * @param {number} boardInfo.destinationIndex Index in the new column
 */
const calculateLayout = (layout, task, boardInfo) => {
  const { oldStatus, newStatus, sourceIndex, destinationIndex } = boardInfo;
  if (oldStatus !== newStatus) {
    return {
      ...layout,
      [oldStatus]: layout[oldStatus].filter(taskId => taskId !== task.id),
      [newStatus]: [
        ...layout[newStatus].slice(0, destinationIndex),
        task.id,
        ...layout[newStatus].slice(destinationIndex)
      ]
    };
  } else {
    return {
      ...layout,
      [oldStatus]: move(layout[oldStatus], sourceIndex, destinationIndex)
    };
  }
};
