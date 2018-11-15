import projectReducer, * as FromProjects from './projectReducer';
import Creators from '../actions/projectActions';

describe('taskReducer', () => {
  const initialState = {
    all: [
      { id: '1', name: 'Test project 1' },
      { id: '2', name: 'Test project 2' },
      { id: '3', name: 'Test project 3' }
    ],
    selected: '1'
  };

  describe('INIT_PROJECTS', () => {
    const projects = [
      { id: '4', name: 'Test project 4' }
    ];

    it('works without initial state', () => {
      const state = projectReducer(undefined, Creators.initProjects(projects));
      expect(state.all).toHaveLength(1);
    });

    it('works with initial state', () => {
      const state = projectReducer(initialState, Creators.initProjects(projects));
      expect(state.all).toHaveLength(1);
      expect(state.all).not.toContain(initialState.all[0]);
      expect(state.all).not.toContain(initialState.all[1]);
      expect(state.all).not.toContain(initialState.all[2]);
    });
  });

  describe('UPDATE_PROJECT', () => {
    const project = {
      id: '1', name: 'Updated project 1'
    };
    it('works without initial state', () => {
      const state = projectReducer(undefined, Creators.updateProject(project));
      expect(state.all).toHaveLength(1);
      expect(state.all).toContain(project);
    });

    it('works with initial state', () => {
      const state = projectReducer(initialState, Creators.updateProject(project));
      expect(state.all).toHaveLength(3);
      expect(state.all).toContain(project);
    });
  });

  describe('CHANGE_SELECTED', () => {
    it('works without initial state', () => {
      const state = projectReducer(undefined, Creators.changeSelected('2'));
      expect(state.selected).toEqual('2');
    });

    it('works with initial state', () => {
      const state = projectReducer(initialState, Creators.changeSelected('2'));
      expect(state.selected).toEqual('2');
    });
  });

  describe('selectors', () => {
    const projects = [
      { id: '1', name: 'Test project 1', taskBoard: 'mock' },
      { id: '2', name: 'Test project 2' },
      { id: '3', name: 'Test project 3' }
    ];
    const selected = '1';

    it('selectCurrentProject returns currently selected project as object', () => {
      const selectedProject = FromProjects.selectCurrentProject(projects, selected);
      expect(selectedProject).toEqual(projects[0]);
    });

    it('selectCurrentTaskboard returns taskboard of the selected project', () => {
      const taskboard = FromProjects.selectCurrentTaskboard(projects, selected);
      expect(taskboard).toEqual(projects[0].taskBoard);
    });

    it('selectCurrentTaskboard returns null when no project is selected', () => {
      const taskboard = FromProjects.selectCurrentTaskboard(projects, undefined);
      expect(taskboard).toBeNull();
    });
  });
});