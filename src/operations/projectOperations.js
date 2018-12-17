import projectService from '../services/projects';
import Creators from '../actions/projectActions';
import { initTasks } from '../operations/taskOperations';

export const initProjects = () => {
  let selected;
  try {
    selected = JSON.parse(localStorage.getItem('selectedProject'));
  } catch (exception) {
    selected = null;
  }
  return async dispatch => {
    try {
      const projects = await projectService.getAll();
      dispatch(Creators.initProjects(projects));
      if (selected) {
        dispatch(Creators.changeSelected(selected));
        dispatch(initTasks(selected));
      }
    } catch (exception) {
      console.log('Error when initializing projects', exception);
    }
  };
};

export const selectProject = project => async dispatch => {
  try {
    localStorage.setItem('selectedProject', JSON.stringify(project));
  } finally {
    dispatch(Creators.changeSelected(project));
    dispatch(initTasks(project));
  }
};

export const createProject = project => async dispatch => {
  try {
    const newProject = await projectService.createNew(project);
    dispatch(Creators.createProject(newProject));
  } catch (exception) {
    console.log('Error when creating a project', exception);
  }
};

export const updateProject = (project, save = true) => async dispatch => {
  try {
    const updatedProject = save
      ? await projectService.update(project)
      : project;
    dispatch(Creators.updateProject(updatedProject));
  } catch (exception) {
    console.warn('Error when updating a project', exception);
  }
};
