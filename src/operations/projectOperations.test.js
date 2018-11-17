import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as Types from '../constants/actionTypes';
jest.mock('../services/projects');
import projectService from '../services/projects';
import * as Operations from '../operations/projectOperations';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('Project operations', () => {
  it('initProjects works when selected project is cached', async () => {
    localStorage.setItem('selectedProject', JSON.stringify(projectService.projects[0]));
    const expectedActions = [
      { type: Types.INIT_PROJECTS, projects: projectService.projects },
      { type: Types.CHANGE_SELECTED, project: projectService.projects[0] }
    ];
    const store = mockStore({ projects: { selected: null, all: [] } });
    await store.dispatch(Operations.initProjects());
    expect(store.getActions()).toEqual(expectedActions);
  });
});