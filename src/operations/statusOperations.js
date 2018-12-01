import statusService from '../services/statuses';
import Creators from '../actions/statusActions';

export const initStatuses = () => {
  return async dispatch => {
    try {
      const statuses = await statusService.getAll();
      dispatch(Creators.initStatuses(statuses));
    } catch (exception) {
      console.warn('Error when initializing statuses', exception);
    }
  };
};
