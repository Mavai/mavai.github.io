import Creators from '../actions/taskboardActions';
import taskboardService from '../services/taskboard';
import move from 'lodash-move';
import { removeTask } from '../operations/taskOperations';

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

export const addTaskToBoard = task => async (dispatch, getState) => {
  try {
    const oldBoard = getState().taskboard;
    const board = {
      ...oldBoard.board,
      [task.status.id]: [...oldBoard.board[task.status.id], task.id]
    };
    const updatedTaskboard = await taskboardService.update({
      ...oldBoard,
      board
    });
    dispatch(Creators.updateTaskboard(updatedTaskboard));
  } catch (excpetion) {
    dispatch(removeTask(task, false));
  }
};

export const removeTaskFromBoard = task => async (dispatch, getState) => {
  const oldBoard = getState().taskboard;
  const board = {
    ...oldBoard.board,
    [task.status.id]: oldBoard.board[task.status.id].filter(
      taskId => taskId !== task.id
    )
  };
  const updatedTaskboard = await taskboardService.update({
    ...oldBoard,
    board
  });
  dispatch(Creators.updateTaskboard(updatedTaskboard.board));
};

export const updateTaskOnBoard = (task, boardInfo) => async (
  dispatch,
  getState
) => {
  const oldBoard = getState().taskboard;
  let board = calculateTaskboard(oldBoard.board, task, boardInfo);
  dispatch(Creators.updateTaskboard(board));
  await taskboardService.update({ ...oldBoard, board });
};

/**
 * Calculates new taskboard when a taks's status is changed.
 * @param {object} taskboard Current taskboard
 * @param {object} task Task to update
 * @param {object} boardInfo Information needed to calculate the new taskboad
 * @param {string} boardInfo.oldStatus Id of the orevious status
 * @param {string} boardInfo.newStatus Id of the new status
 * @param {number} boardInfo.sourceIndex Index in the previous column
 * @param {number} boardInfo.destinationIndex Index in the new column
 */
const calculateTaskboard = (taskboard, task, boardInfo) => {
  const { oldStatus, newStatus, sourceIndex, destinationIndex } = boardInfo;
  if (oldStatus !== newStatus) {
    return {
      ...taskboard,
      [oldStatus]: taskboard[oldStatus].filter(taskId => taskId !== task.id),
      [newStatus]: [
        ...taskboard[newStatus].slice(0, destinationIndex),
        task.id,
        ...taskboard[newStatus].slice(destinationIndex)
      ]
    };
  } else {
    return {
      ...taskboard,
      [oldStatus]: move(taskboard[oldStatus], sourceIndex, destinationIndex)
    };
  }
};
