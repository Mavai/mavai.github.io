const initialState = {
  filter: '',
  sortBy: ''
};

export const taskBoardReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_TASKBOARD_FILTER': {
      return { ...state, filter: action.filter };
    }
    default: {
      return state;
    }
  }
};

export default taskBoardReducer;