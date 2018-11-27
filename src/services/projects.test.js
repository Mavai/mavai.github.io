import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import projectService from './projects';

describe('Project service', () => {
  const mock = new MockAdapter(axios);

  it('getAll returns list of projects', async () => {
    mock
      .onGet('api/projects')
      .reply(200, [
        { id: '1', name: 'Test project 1' },
        { id: '2', name: 'Test project 2' }
      ]);
    const projects = await projectService.getAll();
    expect(projects).toHaveLength(2);
  });

  it('update returns the updated project', async () => {
    const project = { id: '1', name: 'Test project' };
    mock.onPut('api/projects/1').reply(203, project);
    const updatedProject = await projectService.update(project);
    expect(updatedProject).toEqual(project);
  });
});
