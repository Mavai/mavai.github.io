import statusService from '../services/statuses';
import Creators from '../actions/statusActions';

export const initStatuses = () => {
  return async (dispatch) => {
    const statuses = await statusService.getAll();
    dispatch(Creators.initStatuses(statuses));
  };
};