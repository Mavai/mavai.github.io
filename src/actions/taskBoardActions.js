const initTaskboard = taskboard => ({
  type: 'INIT_TASKBOARD',
  taskboard
});

const updateTaskboardFilter = filter => ({
  type: 'UPDATE_TASKBOARD_FILTER',
  filter
});

const updateTaskboardSortBy = sortBy => ({
  type: 'UPDATE_TASKBOARD_SORT_BY',
  sortBy
});

const updateTaskboard = board => ({
  type: 'UPDATE_TASKBOARD',
  board
});

export default {
  initTaskboard,
  updateTaskboardFilter,
  updateTaskboardSortBy,
  updateTaskboard
};
