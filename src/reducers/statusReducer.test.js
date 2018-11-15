import projectReducer from './statusReducer';
import Creators from '../actions/statusActions';

describe('taskReducer', () => {
  const initialState = [
    { id: '1', name: 'Test status 1' },
    { id: '2', name: 'Test status 2' },
    { id: '3', name: 'Test status 3' }
  ];

  describe('INIT_PROJECTS', () => {
    const statuses = [
      { id: '4', name: 'Test project 4' }
    ];

    it('works without initial state', () => {
      const state = projectReducer(undefined, Creators.initStatuses(statuses));
      expect(state).toHaveLength(1);
    });

    it('works with initial state', () => {
      const state = projectReducer(initialState, Creators.initStatuses(statuses));
      expect(state).toHaveLength(1);
      expect(state).not.toContain(initialState[0]);
      expect(state).not.toContain(initialState[1]);
      expect(state).not.toContain(initialState[2]);
    });
  });
});