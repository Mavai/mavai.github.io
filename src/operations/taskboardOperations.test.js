import * as Types from '../constants/actionTypes';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as Operations from '../operations/taskboardOperations';
jest.mock('../services/taskboards');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Taskboard operations', () => {
  let store;
  let taskboard;
  beforeEach(() => {
    const layout = {
      '1': ['1', '2'],
      '2': ['3']
    };
    taskboard = { layout };
    store = store = mockStore({ taskboard });
  });

  it('addToTaskboard updates project with correct taskboard', async () => {
    const task = { id: '4', status: { id: '2' } };
    const updatedLayout = {
      '1': ['1', '2'],
      '2': ['3', '4']
    };
    const expectedActions = [
      { type: Types.UPDATE_TASKBOARD_LAYOUT, layout: updatedLayout }
    ];
    return store.dispatch(Operations.addTaskToBoard(task)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('removeFromTaskboard updates project with correct taskboard', async () => {
    const task = { id: '3', status: { id: '2' } };
    const updatedLayout = {
      '1': ['1', '2'],
      '2': []
    };
    const expectedActions = [
      { type: Types.UPDATE_TASKBOARD_LAYOUT, layout: updatedLayout }
    ];
    return store
      .dispatch(Operations.removeTaskFromBoard(task))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('updateTaskOnBoard updates project with correct taskboard when status is updated', async () => {
    const task = { id: '3' };
    const boardInfo = {
      oldStatus: '2',
      newStatus: '1',
      destinationIndex: 1
    };
    const updatedLayout = {
      '1': ['1', '3', '2'],
      '2': []
    };
    const expectedActions = [
      {
        type: Types.UPDATE_TASKBOARD_LAYOUT,
        layout: updatedLayout
      }
    ];
    return store
      .dispatch(Operations.updateTaskOnBoard(task, boardInfo))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('updateTaskOnBoard updates taskboard with correct layout when status is not updated', async () => {
    const task = { id: '1' };
    const boardInfo = {
      oldStatus: '1',
      newStatus: '1',
      destinationIndex: 1
    };
    const updatedLayout = {
      '1': ['2', '1'],
      '2': ['3']
    };
    const expectedActions = [
      {
        type: Types.UPDATE_TASKBOARD_LAYOUT,
        layout: updatedLayout
      }
    ];
    return store
      .dispatch(Operations.updateTaskOnBoard(task, boardInfo))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});