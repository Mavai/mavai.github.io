const initProjects = projects => ({
  type: 'INIT_PROJECTS',
  projects
});

const changeSelected = project => ({
  type: 'CHANGE_SELECTED',
  project
});

const updateProject = project => ({
  type: 'UPDATE_PROJECT',
  project
});

export default {
  initProjects,
  changeSelected,
  updateProject
};