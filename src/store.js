import { createStore, combineReducers, applyMiddleware } from 'redux';
import taskReducer, * as FromTasks from './reducers/taskReducer';
import statusReducer from './reducers/statusReducer';
import projectReducer, * as FromProjects from './reducers/projectReducer';
import taskBoardReducer from './reducers/taskBoardReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const reducer = combineReducers({
  tasks: taskReducer,
  statuses: statusReducer,
  projects: projectReducer,
  taskboard: taskBoardReducer
});

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);

//Task selectors
export const selectTasksByStatus = state => {
  const { tasks, statuses } = state;
  return FromTasks.selectTasksByStatus(tasks, statuses);
};

export const selectTasks = state => {
  return state.tasks;
};

export const selectTasksAsMap = state => {
  const { tasks } = state;
  return FromTasks.selectTasksAsMap(tasks);
};

//Project selectors
export const selectProjects = state => {
  return state.projects.all;
};

export const selectCurrentProject = state => {
  const { all, selected } = state.projects;
  return FromProjects.selectCurrentProject(all, selected);
};

//Status selectors
export const selectStatuses = state => {
  return state.statuses;
};

//Taskboard selectors
export const selectCurrentTaskboard = state => {
  return state.taskboard.board;
};

export default store;