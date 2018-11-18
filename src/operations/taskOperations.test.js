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
    const updateProject = { ...project, taskBoard: updateTaskBoard, saved: true };
    const expectedActions = [
      { type: Types.CREATE_TASK, task: { ...task, project: project.id, created: true } },
      { type: Types.UPDATE_PROJECT, project: updateProject }
    ];
    await store.dispatch(Operations.createTask(task));
    expect(store.getActions()).toEqual(expectedActions);
  });
});