import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import statusService from './statuses';

describe('Status service', () => {
  const mock = new MockAdapter(axios);

  it('getAll returns list of statuses', async () => {
    mock
      .onGet('api/statuses')
      .reply(200, [
        { id: '1', name: 'Test status 1' },
        { id: '2', name: 'Test status 2' }
      ]);
    const status = await statusService.getAll();
    expect(status).toHaveLength(2);
  });
});
