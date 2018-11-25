import projectService from '../services/projects';
import Creators from '../actions/projectActions';
import { initTasks } from '../operations/taskOperations';
import { initTaskboard } from '../operations/taskBoardOperations';

export const initProjects = () => {
  const selected = JSON.parse(localStorage.getItem('selectedProject'));
  return async (dispatch) => {
    const projects = await projectService.getAll();
    dispatch(Creators.initProjects(projects));
    dispatch(initTaskboard(projects[0].taskBoard));
    if (selected) {
      dispatch(Creators.changeSelected(selected));
      dispatch(initTasks(selected));
    }
  };
};

export const selectProject = (project) => async dispatch => {
  localStorage.setItem('selectedProject', JSON.stringify(project));
  dispatch(Creators.changeSelected(project));
  dispatch(initTasks(project));
};

export const updateProject = (project, save=true) => async dispatch => {
  const updatedProject = save ? await projectService.update(project) : project;
  dispatch(Creators.updateProject(updatedProject));
};
