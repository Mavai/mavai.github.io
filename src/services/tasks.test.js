import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import taskService from './tasks';

describe('Task service', () => {
  const mock = new MockAdapter(axios);

  it('getAll returns list of tasks', async () => {
    mock.onGet('api/tasks').reply(200, [
      { id: '1', name: 'Test task 1' },
      { id: '2', name: 'Test task 2' }
    ]);
    const tasks = await taskService.getAll();
    expect(tasks).toHaveLength(2);
  });

  it('geAllFromProject returns list of tasks', async () => {
    mock.onGet('api/tasks/project/1').reply(200, [
      { id: '1', name: 'Test task 1' },
      { id: '2', name: 'Test task 2' }
    ]);
    const tasks = await taskService.getAllFromProject('1');
    expect(tasks).toHaveLength(2);
  });

  it('createNew returns the created task', async () => {
    const task = { id: '1', name: 'Test task' };
    mock.onPost('api/tasks').reply(201, task);
    const createdTask = await taskService.createNew(task);
    expect(createdTask).toEqual(task);
  });

  it('update returns the updated task', async () => {
    const task = { id: '1', name: 'Test task' };
    mock.onPut('api/tasks/1').reply(203, task);
    const updatedTask = await taskService.update(task);
    expect(updatedTask).toEqual(task);
  });

  it('remove returns the deleted task', async () => {
    const task = { id: '1', name: 'Test task' };
    mock.onDelete('api/tasks/1').reply(203, task);
    const deletedTask = await taskService.remove(task);
    expect(deletedTask).toEqual(task);
  });
});