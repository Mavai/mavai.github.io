import Creators from '../actions/taskBoardActions';

export const updateTaskBoardFilter = filter => {
  return Creators.updateTaskBoardFilter(filter);
};