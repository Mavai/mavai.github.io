import userService from '../services/users';

export const createUser = user => async dispatch => {
  try {
    userService.createNew(user);
  } catch (exception) {
    console.log('Error when creating a user', exception);
  }
};
