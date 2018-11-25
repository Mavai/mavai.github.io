const initTaskboard = (board) => ({
  type: 'INIT_TASKBOARD',
  board
});

const updateTaskBoardFilter = (filter) => ({
  type: 'UPDATE_TASKBOARD_FILTER',
  filter
});

const updateTaskBoardSortBy = (sortBy) => ({
  type: 'UPDATE_TASKBOARD_SORT_BY',
  sortBy
});

const updateTaskBoard = (board) => ({
  type: 'UPDATE_TASKBOARD',
  board
});

export default {
  initTaskboard,
  updateTaskBoardFilter,
  updateTaskBoardSortBy,
  updateTaskBoard,
};