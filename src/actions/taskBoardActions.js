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

const updateTaskboardLayout = layout => ({
  type: 'UPDATE_TASKBOARD_LAYOUT',
  layout
});

export default {
  initTaskboard,
  updateTaskboardFilter,
  updateTaskboardSortBy,
  updateTaskboardLayout
};
