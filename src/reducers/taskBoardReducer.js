const initialState = {
  filter: '',
  sortBy: '',
  layout: null
};

export const taskboardReducer = (state = initialState, action) => {
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
    case 'UPDATE_TASKBOARD_LAYOUT': {
      return { ...state, layout: action.layout };
    }
    default: {
      return state;
    }
  }
};

export default taskboardReducer;
