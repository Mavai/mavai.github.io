import React from 'react';
import { shallow } from 'enzyme';
import { App } from './App';
import ProjectInfo from './components/Project/ProjectInfo';
import Taskboard from './components/Taskboard/Taskboard';
import NewTaskForm from './components/Task/NewTaskForm';
import Backlog from './components/Task/Backlog';
import ProjectForm from './components/Project/ProjectForm';
import LoginForm from './components/User/LoginForm';
import UserForm from './components/User/UserForm';

describe('<App />', () => {
  it('componentDidMount initializes projects and statuses', async () => {
    const mockInitStatuses = jest.fn();
    const mockInitProjects = jest.fn();
    await shallow(
      <App initStatuses={mockInitStatuses} initProjects={mockInitProjects} />
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
    const projectInfo = wrapper
      .find('Route')
      .first()
      .prop('render')();
    expect(projectInfo).toEqual(<ProjectInfo />);
    const backlog = wrapper
      .find('Route')
      .at(1)
      .prop('render')();
    expect(backlog).toEqual(<Backlog />);
    const taskboard = wrapper
      .find('Route')
      .at(2)
      .prop('render')();
    expect(taskboard).toEqual(<Taskboard />);
    const projectForm = wrapper
      .find('Route')
      .at(3)
      .prop('render')({ history: 'mock' });
    expect(projectForm).toEqual(
      <ProjectForm onSubmit={expect.any(Function)} />
    );
    const newTaskForm = wrapper
      .find('Route')
      .at(4)
      .prop('render')({ history: 'mock' });
    expect(newTaskForm).toEqual(<NewTaskForm history="mock" />);
    const userForm = wrapper
      .find('Route')
      .at(5)
      .prop('render')({ history: 'mock' });
    expect(userForm).toEqual(<UserForm onSubmit={expect.any(Function)} />);
    const loginForm = wrapper
      .find('Route')
      .at(6)
      .prop('render')({ history: 'mock' });
    expect(loginForm).toEqual(<LoginForm />);
  });
});
