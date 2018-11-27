const initialState = {
  all: [],
  selected: null
};

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INIT_PROJECTS': {
      const { projects, selected } = action;
      return { ...state, all: projects, selected };
    }
    case 'CHANGE_SELECTED':
      return { ...state, selected: action.project };
    case 'UPDATE_PROJECT': {
      let filteredProjects = state.all.filter(
        project => project.id !== action.project.id
      );
      return {
        ...state,
        all: [...filteredProjects, action.project]
      };
    }
    default:
      return state;
  }
};

export const selectCurrentProject = (all, selected) => {
  return all.find(project => project.id === selected);
};

export const selectCurrentTaskboard = (all, selected) => {
  const selectedProject = selectCurrentProject(all, selected);
  return selectedProject ? selectedProject.taskboard : null;
};

export default projectReducer;
