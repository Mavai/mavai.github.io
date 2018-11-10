import React from 'react';
import { shallow } from 'enzyme';
import { NewTaskForm } from './NewTaskForm';
import Placeholder from './Placeholder';
import TaskForm from './TaskForm';
import { createMemoryHistory } from 'history';

const project = { name: 'Selected project' };

describe.only('<NewTaskForm />', () => {
  it('renders content correctly when no project is selected', () => {
    const wrapper = shallow(<NewTaskForm selectedProject={null} />);
    expect(wrapper.find(Placeholder).exists()).toEqual(true);
    expect(wrapper.find(TaskForm).exists()).toEqual(false);
  });

  it('renders content correctly when a project is selected', () => {
    const wrapper = shallow(<NewTaskForm selectedProject={project} />);
    expect(wrapper.find(TaskForm).exists()).toEqual(true);
    expect(wrapper.find(Placeholder).exists()).toEqual(false);
  });

  it('createTask is called and history is updated when form is submitted', () => {
    const mockSubmit = jest.fn();
    let history = createMemoryHistory('/create');
    const wrapper = shallow(
      <NewTaskForm
        selectedProject={project}
        createTask={mockSubmit}
        history={history}
      />
    );
    wrapper.instance().onSubmit({});
    expect(mockSubmit.mock.calls.length).toEqual(1);
    expect(history.length).toEqual(2);
    expect(history.location.pathname).toEqual('/');
  });
});