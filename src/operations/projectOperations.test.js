import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as Types from '../constants/actionTypes';
import projectService from '../services/projects';
import taskService from '../services/tasks';
import * as Operations from '../operations/projectOperations';
import { getAction } from '../testUtils';
jest.mock('../services/projects');
jest.mock('../services/tasks');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Project operations', () => {
  let store;
  beforeEach(() => {
    store = store = mockStore({ projects: { selected: null, all: [] } });
  });

  it('initProjects works and changes selected when one is cached', async () => {
    localStorage.setItem(
      'selectedProject',
      JSON.stringify(projectService.projects[0])
    );
    await store.dispatch(Operations.initProjects());
    expect(await getAction(store, Types.INIT_PROJECTS)).toEqual({
      type: Types.INIT_PROJECTS,
      projects: projectService.projects
    });
    expect(await getAction(store, Types.CHANGE_SELECTED)).toEqual({
      type: Types.CHANGE_SELECTED,
      project: projectService.projects[0]
    });
    expect(await getAction(store, Types.INIT_TASKS)).toEqual({
      type: Types.INIT_TASKS,
      tasks: taskService.tasks
    });
  });

  it('initProjects does not change selected when one is not cached', async () => {
    localStorage.clear();
    const expectedActions = [
      { type: Types.INIT_PROJECTS, projects: projectService.projects }
    ];
    await store.dispatch(Operations.initProjects());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('selectProject changes selected project and updates cache', async () => {
    localStorage.clear();
    const project = projectService.projects[0];
    await store.dispatch(Operations.selectProject(project));
    expect(await getAction(store, Types.CHANGE_SELECTED)).toEqual({
      type: Types.CHANGE_SELECTED,
      project: project
    });
    expect(await getAction(store, Types.INIT_TASKS)).toEqual({
      type: Types.INIT_TASKS,
      tasks: taskService.tasks
    });
  });

  it('updateProject does not save changes to db when save=false', async () => {
    const project = projectService.projects[0];
    const expectedActions = [{ type: Types.UPDATE_PROJECT, project: project }];
    await store.dispatch(Operations.updateProject(project, false));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('updateProject saves changes to db by default', async () => {
    const project = projectService.projects[0];
    const expectedActions = [
      { type: Types.UPDATE_PROJECT, project: { ...project, saved: true } }
    ];
    await store.dispatch(Operations.updateProject(project));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
