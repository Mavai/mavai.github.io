const initialState = [];

const statusReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INIT_STATUSES':
      return action.statuses;
    default:
      return state;
  }
};

export default statusReducer;
