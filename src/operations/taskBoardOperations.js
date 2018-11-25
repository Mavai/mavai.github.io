import Creators from '../actions/taskBoardActions';
import taskboardService from '../services/taskboard';
import move from 'lodash-move';

export const initTaskboard = board => {
  return Creators.initTaskboard(board);
};
export const updateTaskBoardFilter = filter => {
  return Creators.updateTaskBoardFilter(filter);
};

export const updateTaskBoardSortBy = sortBy => {
  return Creators.updateTaskBoardSortBy(sortBy);
};

export const loadTaskboard = id => async dispatch => {
  if (!id) dispatch(Creators.updateTaskBoard(null));
  const taskboard = await taskboardService.getOne(id);
  dispatch(Creators.updateTaskBoard(taskboard.board));
};

export const addTaskToBoard = (task) => async (dispatch, getState) => {
  const oldBoard = getState().taskBoard.board;
  const board = {
    ...getState().taskBoard.board,
    [task.status.id]: [ ...oldBoard[task.status.id], task.id ]
  };
  const updatedTaskboard = await taskboardService.update({ ...oldBoard, board });
  dispatch(Creators.updateTaskBoard(updatedTaskboard));
};

export const removeTaskFromBoard = (task) => async (dispatch, getState) => {
  const oldBoard = getState().taskBoard.board;
  const board = {
    ...oldBoard,
    [task.status.id]: oldBoard[task.status.id]
      .filter(taskId => taskId !== task.id)
  };
  const updatedTaskboard = await taskboardService.update({ ...oldBoard, board });
  dispatch(Creators.updateTaskBoard(updatedTaskboard));
};

export const updateTaskOnBoard = (task, boardInfo) => async (dispatch, getState) => {
  const oldBoard = getState().taskBoard.board;
  const project = getState().projects.selected;
  let board = calculateTaskBoard(oldBoard, task, boardInfo);
  dispatch(Creators.updateTaskBoard(board));
  await taskboardService.update({ board, project });
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