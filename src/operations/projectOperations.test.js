import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as Types from '../constants/actionTypes';
jest.mock('../services/projects');
import projectService from '../services/projects';
jest.mock('../services/tasks');
import taskService from '../services/tasks';
import * as Operations from '../operations/projectOperations';
import { getAction } from '../testUtils';

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

  it('addToTaskboard updates project with correct taskboard', async () => {
    const task = { id: '4', status: { id: '2' } };
    const taskboard = {
      '1': ['1', '2'],
      '2': ['3']
    };
    const project = {
      taskboard
    };
    const updateTaskboard = {
      '1': ['1', '2'],
      '2': ['3', '4']
    };
    const updateProject = {
      ...project,
      taskboard: updateTaskboard,
      saved: true
    };
    const expectedActions = [
      { type: Types.UPDATE_PROJECT, project: updateProject }
    ];
    return store.dispatch(Operations.addTaskToBoard(project, task)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('removeFromTaskboard updates project with correct taskboard', async () => {
    const task = { id: '3', status: { id: '2' } };
    const taskboard = {
      '1': ['1', '2'],
      '2': ['3']
    };
    const project = {
      taskboard
    };
    const updateTaskboard = {
      '1': ['1', '2'],
      '2': []
    };
    const updateProject = {
      ...project,
      taskboard: updateTaskboard,
      saved: true
    };
    const expectedActions = [
      { type: Types.UPDATE_PROJECT, project: updateProject }
    ];
    return store
      .dispatch(Operations.removeTaskFromBoard(project, task))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('updateTaskOnBoard updates project with correct taskboard when status is updated', async () => {
    const task = { id: '3' };
    const boardInfo = {
      oldStatus: '2',
      newStatus: '1',
      sourceIndex: 0,
      destinationIndex: 1
    };
    const taskboard = {
      '1': ['1', '2'],
      '2': ['3']
    };
    const project = {
      taskboard
    };
    const updateTaskboard = {
      '1': ['1', '3', '2'],
      '2': []
    };
    const expectedActions = [
      {
        type: Types.UPDATE_PROJECT,
        project: { ...project, taskboard: updateTaskboard }
      }
    ];
    return store
      .dispatch(Operations.updateTaskOnBoard(project, task, boardInfo))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('updateTaskOnBoard updates project with correct taskboard when status is updated', async () => {
    const task = { id: '3' };
    const boardInfo = {
      oldStatus: '1',
      newStatus: '1',
      sourceIndex: 0,
      destinationIndex: 1
    };
    const taskboard = {
      '1': ['1', '2'],
      '2': ['3']
    };
    const project = {
      taskboard
    };
    const updateTaskboard = {
      '1': ['2', '1'],
      '2': ['3']
    };
    const expectedActions = [
      {
        type: Types.UPDATE_PROJECT,
        project: { ...project, taskboard: updateTaskboard }
      }
    ];
    return store
      .dispatch(Operations.updateTaskOnBoard(project, task, boardInfo))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
