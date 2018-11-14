import taskReducer, * as FromTasks from './taskReducer';
import Creators from '../actions/taskActions';

describe('taskReducer', () => {
  const initialState = [
    { id: '1', name: 'Test task 1' },
    { id: '2', name: 'Test task 2' },
    { id: '3', name: 'Test task 3' }
  ];

  describe('INIT_TASKS', () => {
    const tasks = [
      { id: '4', name: 'Test task 4' }
    ];

    it('works without initial state', () => {
      const state = taskReducer(undefined, Creators.initTasks(tasks));
      expect(state).toHaveLength(1);
    });

    it('works with initial state', () => {
      const state = taskReducer(initialState, Creators.initTasks(tasks));
      expect(state).toHaveLength(1);
      expect(state).not.toContain(initialState[0]);
      expect(state).not.toContain(initialState[1]);
      expect(state).not.toContain(initialState[2]);
    });
  });

  describe('CREATE_TASK', () => {
    const task = {
      id: '4', name: 'Test task 4'
    };
    it('works without initial state', () => {
      const state = taskReducer(undefined, Creators.createTask(task));
      expect(state).toHaveLength(1);
      expect(state).toContain(task);
    });

    it('works with initial state', () => {
      const state = taskReducer(initialState, Creators.createTask(task));
      expect(state).toHaveLength(4);
      expect(state).toContain(task);
    });
  });

  describe('UPDATE_TASK', () => {
    const task = {
      id: '1', name: 'Test task 1', description: 'Task updated'
    };
    it('works without initial state', () => {
      const state = taskReducer(undefined, Creators.updateTask(task));
      expect(state).toHaveLength(1);
      expect(state).toContain(task);
    });

    it('works with initial state', () => {
      const state = taskReducer(initialState, Creators.updateTask(task));
      expect(state).toHaveLength(3);
      expect(state).toContain(task);
    });
  });

  describe('DELETE_TASK', () => {
    const task = {
      id: '1', name: 'Test task 1'
    };
    it('works without initial state', () => {
      const state = taskReducer(undefined, Creators.deleteTask(task));
      expect(state).toHaveLength(0);
    });

    it('works with initial state', () => {
      const state = taskReducer(initialState, Creators.deleteTask(task));
      expect(state).toHaveLength(2);
      expect(state).not.toContain(task);
    });
  });

  describe('selectors', () => {
    const tasks = [
      { id: '1', name: 'Test task 1', status: { id: '1' } },
      { id: '2', name: 'Test task 2', status: { id: '1' } },
      { id: '3', name: 'Test task 3', status: { id: '2' } }
    ];
    it('selectTasksByStatus returns tasks mapped by status', () => {
      const statuses = [ { id: '1' }, { id: '2' } ];
      const tasksByStatus = FromTasks.selectTasksByStatus(tasks, statuses);
      expect(tasksByStatus).toHaveLength(2);
      expect(tasksByStatus[0].status).toEqual(statuses[0]);
      expect(tasksByStatus[0].tasks).toHaveLength(2);
      expect(tasksByStatus[0].tasks).toEqual([ tasks[0], tasks[1] ]);
      expect(tasksByStatus[1].status).toEqual(statuses[1]);
      expect(tasksByStatus[1].tasks).toHaveLength(1);
      expect(tasksByStatus[1].tasks).toEqual([ tasks[2] ]);
    });

    it('selectTasksAsMap returns tasks as a map', () => {
      const tasksAsMap = FromTasks.selectTasksAsMap(tasks);
      expect(Object.keys(tasksAsMap)).toHaveLength(3);
      expect(tasksAsMap['1']).toEqual(tasks[0]);
      expect(tasksAsMap['2']).toEqual(tasks[1]);
      expect(tasksAsMap['3']).toEqual(tasks[2]);
    });

    it('selectTasksAsMap returns null if no tasks are provided', () => {
      const tasksAsMap = FromTasks.selectTasksAsMap([]);
      expect(tasksAsMap).toEqual(null);
    });
  });
});