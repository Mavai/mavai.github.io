import React from 'react';
import { shallow } from 'enzyme';
import { NewTaskForm } from './NewTaskForm';
import Placeholder from './Placeholder';
import TaskForm from './TaskForm';

describe.only('<NewTaskForm />', () => {
  it('renders content correctly when no project is selected', () => {
    const wrapper = shallow(<NewTaskForm selectedProject={null} />);
    expect(wrapper.find(Placeholder).exists()).toEqual(true);
    expect(wrapper.find(TaskForm).exists()).toEqual(false);
  });

  it('renders content correctly when a project is selected', () => {
    const project = { name: 'Selected project' };
    const wrapper = shallow(<NewTaskForm selectedProject={project} />);
    expect(wrapper.find(TaskForm).exists()).toEqual(true);
    expect(wrapper.find(Placeholder).exists()).toEqual(false);
  });
});