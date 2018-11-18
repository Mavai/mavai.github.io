import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as Types from '../constants/actionTypes';
jest.mock('../services/statuses');
import statusService from '../services/statuses';
import * as Operations from '../operations/statusOperations';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('Status operations', () => {
  let store;
  beforeEach(() => {
    store = store = mockStore({ statuses: [] });
  });

  it('initStatuses works', async () => {
    const expectedActions = [
      { type: Types.INIT_STAUSES, statuses: statusService.statuses },
    ];
    await store.dispatch(Operations.initStatuses());
    expect(store.getActions()).toEqual(expectedActions);
  });
});