import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as Types from '../constants/actionTypes';
import taskService from '../services/tasks';
import * as Operations from '../operations/taskOperations';
import { getAction } from '../testUtils';
jest.mock('../services/tasks');
jest.mock('../services/taskboards');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Task operations', () => {
  let store;
  const taskboard = {
    '1': ['1', '2'],
    '2': ['3']
  };
  const project = { id: '1', name: 'Test project', taskboard };
  beforeEach(() => {
    const layout = {
      '1': ['1', '2'],
      '2': ['3']
    };
    const taskboard = { layout };
    store = mockStore({
      tasks: [],
      taskboard,
      projects: { all: [project], selected: '1' }
    });
  });

  it('initTasks works', async () => {
    const expectedActions = [
      { type: Types.INIT_TASKS, tasks: taskService.tasks }
    ];
    await store.dispatch(Operations.initTasks());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('createTask works and updates layout of current taskboard', async () => {
    const task = { id: '4', status: { id: '2' } };
    const updatedLayout = {
      '1': ['1', '2'],
      '2': ['3', '4']
    };
    await store.dispatch(Operations.createTask(task));
    expect(await getAction(store, Types.CREATE_TASK)).toEqual({
      type: Types.CREATE_TASK,
      task: { ...task, project: project.id, created: true }
    });
    expect(await getAction(store, Types.UPDATE_TASKBOARD_LAYOUT)).toEqual({
      type: Types.UPDATE_TASKBOARD_LAYOUT,
      layout: updatedLayout
    });
  });

  it('removeTask works and updates taskboard of selected project', async () => {
    const task = { id: '3', status: { id: '2' } };
    const updatedLayout = {
      '1': ['1', '2'],
      '2': []
    };
    await store.dispatch(Operations.removeTask(task));
    expect(await getAction(store, Types.DELETE_TASK)).toEqual({
      type: Types.DELETE_TASK,
      task
    });
    expect(await getAction(store, Types.UPDATE_TASKBOARD_LAYOUT)).toEqual({
      type: Types.UPDATE_TASKBOARD_LAYOUT,
      layout: updatedLayout
    });
  });

  it('updateTask does not save changes to db when save=false', async () => {
    const task = { id: '3', status: { id: '2' } };
    const expectedActions = [{ type: Types.UPDATE_TASK, task }];
    await store.dispatch(Operations.updateTask(task, false));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('updateTask saves changes to db by default', async () => {
    const task = { id: '3', status: { id: '2' } };
    await store.dispatch(Operations.updateTask(task));
    expect(await getAction(store, Types.UPDATE_TASK)).toEqual({
      type: Types.UPDATE_TASK, task: { ...task, saved: true }
    });
  });

  it('updateTask works and updates taskboard with boardInfo', async () => {
    const task = { id: '3' };
    const boardInfo = {
      oldStatus: '2',
      newStatus: '1',
      destinationIndex: Infinity
    };
    const updatedLayout = {
      '1': ['1', '2', '3'],
      '2': []
    };
    await store.dispatch(Operations.updateTask(task, true, boardInfo));
    expect(await getAction(store, Types.UPDATE_TASKBOARD_LAYOUT)).toEqual({
      type: Types.UPDATE_TASKBOARD_LAYOUT,
      layout: updatedLayout
    });
    expect(await getAction(store, Types.UPDATE_TASK)).toEqual({
      type: Types.UPDATE_TASK,
      task: { ...task, saved: true }
    });
  });
});
