const initialState = {
  filter: '',
  sortBy: '',
  board: null
};

export const taskBoardReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INIT_TASKBOARD': {
      return { ...initialState, ...action.taskboard };
    }
    case 'UPDATE_TASKBOARD_FILTER': {
      return { ...state, filter: action.filter };
    }
    case 'UPDATE_TASKBOARD_SORT_BY': {
      return { ...state, sortBy: action.sortBy };
    }
    case 'UPDATE_TASKBOARD': {
      return { ...state, board: action.board };
    }
    default: {
      return state;
    }
  }
};

export default taskBoardReducer;