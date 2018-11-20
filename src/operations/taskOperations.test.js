import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as Types from '../constants/actionTypes';
jest.mock('../services/tasks');
import taskService from '../services/tasks';
jest.mock('../services/projects');
import * as Operations from '../operations/taskOperations';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('Task operations', () => {
  let store;
  const taskBoard = {
    '1': [ '1', '2' ],
    '2': [ '3' ]
  };
  const project = { id: '1', name: 'Test project', taskBoard };
  beforeEach(() => {
    store = store = mockStore({ tasks: [], projects: { all: [ project ], selected: '1' } });
  });

  it('initTasks works', async () => {
    const expectedActions = [
      { type: Types.INIT_TASKS, tasks: taskService.tasks },
    ];
    await store.dispatch(Operations.initTasks());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('createTask works and updates taskboard of selected project', async () => {
    const task = { id: '4', status: { id: '2' } };
    const updateTaskBoard = {
      '1': [ '1', '2' ],
      '2': [ '3', '4' ]
    };
    const updatedProject = { ...project, taskBoard: updateTaskBoard, saved: true };
    const expectedActions = [
      { type: Types.CREATE_TASK, task: { ...task, project: project.id, created: true } },
      { type: Types.UPDATE_PROJECT, project: updatedProject }
    ];
    await store.dispatch(Operations.createTask(task));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('removeTask works and updates taskboard of selected project', async () => {
    const task = { id: '3', status: { id: '2' } };
    const updateTaskBoard = {
      '1': [ '1', '2' ],
      '2': []
    };
    const updatedProject = { ...project, taskBoard: updateTaskBoard, saved: true };
    const expectedActions = [
      { type: Types.DELETE_TASK, task },
      { type: Types.UPDATE_PROJECT, project: updatedProject }
    ];
    await store.dispatch(Operations.removeTask(task));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('updateTask does not save changes to db when save=false', async () => {
    const task = { id: '3', status: { id: '2' } };
    const expectedActions = [
      { type: Types.UPDATE_TASK, task }
    ];
    await store.dispatch(Operations.updateTask(task, false));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('updateTask saves changes to db by default', async () => {
    const task = { id: '3', status: { id: '2' } };
    const expectedActions = [
      { type: Types.UPDATE_TASK, task: { ...task, saved: true } }
    ];
    await store.dispatch(Operations.updateTask(task));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('updateTask works and updates taskboard with boardInfo', async () => {
    const task = { id: '3' };
    const boardInfo = {
      oldStatus: '2',
      newStatus: '1',
      sourceIndex: 0,
      destinationIndex: Infinity
    };
    const updateTaskBoard = {
      '1': [ '1', '2', '3' ],
      '2': []
    };
    const updatedProject = { ...project, taskBoard: updateTaskBoard };
    const expectedActions = [
      { type: Types.UPDATE_TASK, task: { ...task, saved: true } },
      { type: Types.UPDATE_PROJECT, project: updatedProject },
      { type: Types.UPDATE_PROJECT, project: { ...updatedProject, saved: true } }
    ];
    await store.dispatch(Operations.updateTask(task, true, boardInfo));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('updateTask works and updates taskboard with boardInfo', async () => {
    const task = { id: '3' };
    const boardInfo = {
      oldStatus: '2',
      newStatus: '1',
      sourceIndex: 0,
      destinationIndex: 1
    };
    const updateTaskBoard = {
      '1': [ '1', '3', '2' ],
      '2': []
    };
    const updatedProject = { ...project, taskBoard: updateTaskBoard };
    const expectedActions = [
      { type: Types.UPDATE_PROJECT, project: updatedProject },
      { type: Types.UPDATE_TASK, task: { ...task, saved: true } },
      { type: Types.UPDATE_PROJECT, project: { ...updatedProject, saved: true } }
    ];
    await store.dispatch(Operations.changeTaskStatus(task, boardInfo));
    expect(store.getActions()).toEqual(expectedActions);
  });
});