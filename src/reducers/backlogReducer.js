const initialState = {
  includeFromTaskboards: false
};

const backlogReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_INCLUDE_FROM_TASKBOARDS': {
      return { ...state, includeFromTaskboards: !state.includeFromTaskboards };
    }
    default: {
      return state;
    }
  }
};

export default backlogReducer;
