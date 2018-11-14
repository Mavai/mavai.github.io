import { createStore, combineReducers, applyMiddleware } from 'redux';
import taskReducer, * as FromTasks from './reducers/taskReducer';
import statusReducer from './reducers/statusReducer';
import projectReducer from './reducers/projectReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const reducer = combineReducers({
  tasks: taskReducer,
  statuses: statusReducer,
  projects: projectReducer
});

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);

export const selectTasksByStatus = state => {
  const { tasks, statuses } = state;
  return FromTasks.selectTasksByStatus(tasks, statuses);
};

export const selectsTasks = state => {
  return state.tasks;
};

export const selectTasksAsMap = state => {
  const { tasks } = state;
  return FromTasks.selectTasksAsMap(tasks);
};

export default store;