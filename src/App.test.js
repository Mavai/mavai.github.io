import React from 'react';
import { shallow } from 'enzyme';
import { App } from './App';
import ProjectInfo from './components/ProjectInfo';
import TaskBoard from './components/TaskBoard';
import NewTaskForm from './components/NewTaskForm';

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

  it('renders navbar with correct links', () => {
    const mockInitStatuses = jest.fn();
    const mockInitProjects = jest.fn();
    const mockInitTasks = jest.fn();
    const project = { id: '1' };
    const wrapper = shallow(
      <App
        initStatuses={mockInitStatuses}
        initProjects={mockInitProjects}
        initTasks={mockInitTasks}
        selectedProject={project}
      />
    );
    const projectInfo = wrapper.find('Route').first().prop('render')();
    expect(projectInfo).toEqual(<ProjectInfo />);
    const taskBoard = wrapper.find('Route').at(1).prop('render')();
    expect(taskBoard).toEqual(<TaskBoard />);
    const newTaskForm = wrapper.find('Route').at(2).prop('render')({ history: 'mock' });
    expect(newTaskForm).toEqual(<NewTaskForm history='mock' />);
  });
});