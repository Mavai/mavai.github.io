import React from 'react';
import { shallow } from 'enzyme';
import { App } from './App';

describe('<App />', () => {
  it('componentDidMount initializes projects and statuses', async () => {
    const mockInitStatuses = jest.fn();
    const mockInitProjects = jest.fn();
    await shallow(
      <App
        initStatuses={mockInitStatuses}
        initProjects={mockInitProjects}
      />
    );
    expect(mockInitStatuses.mock.calls).toHaveLength(1);
    expect(mockInitProjects.mock.calls).toHaveLength(1);
  });

  it('componentDidUpdate initializes tasks when project is selected', () => {
    const mockInitTasks = jest.fn();
    const project = { id: '1' };
    const wrapper = shallow(
      <App
        initTasks={mockInitTasks}
        selectedProject={project}
      />
    );
    wrapper.instance().componentDidUpdate();
    expect(mockInitTasks.mock.calls).toHaveLength(1);
    expect(mockInitTasks.mock.calls[0][0]).toEqual(project.id);
  });

  it('componentDidUpdate does not initialize tasks when project is not selected', () => {
    const mockInitTasks = jest.fn();
    const wrapper = shallow(
      <App
        initTasks={mockInitTasks}
      />
    );
    wrapper.instance().componentDidUpdate();
    expect(mockInitTasks.mock.calls).toHaveLength(0);
  });
});