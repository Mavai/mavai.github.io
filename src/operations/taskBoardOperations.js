import Creators from '../actions/taskBoardActions';
import taskboardService from '../services/taskboard';
import move from 'lodash-move';

export const initTaskboard = () => async dispatch => {
  const savedBoard = localStorage.getItem('currentBoard');
  const taskboard = await taskboardService.getOne(savedBoard);
  dispatch(Creators.initTaskboard(taskboard));
};
export const updateTaskBoardFilter = filter => {
  return Creators.updateTaskBoardFilter(filter);
};

export const updateTaskBoardSortBy = sortBy => {
  return Creators.updateTaskBoardSortBy(sortBy);
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
  const oldBoard = getState().taskBoard;
  const board = {
    ...oldBoard.board,
    [task.status.id]: [ ...oldBoard.board[task.status.id], task.id ]
  };
  const updatedTaskboard = await taskboardService.update({ ...oldBoard, board });
  dispatch(Creators.updateTaskBoard(updatedTaskboard));
};

export const removeTaskFromBoard = task => async (dispatch, getState) => {
  const oldBoard = getState().taskBoard;
  const board = {
    ...oldBoard.board,
    [task.status.id]: oldBoard.board[task.status.id]
      .filter(taskId => taskId !== task.id)
  };
  const updatedTaskboard = await taskboardService.update({ ...oldBoard, board });
  dispatch(Creators.updateTaskBoard(updatedTaskboard.board));
};

export const updateTaskOnBoard = (task, boardInfo) => async (dispatch, getState) => {
  const oldBoard = getState().taskboard;
  let board = calculateTaskBoard(oldBoard.board, task, boardInfo);
  dispatch(Creators.updateTaskBoard(board));
  await taskboardService.update({ ...oldBoard, board });
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