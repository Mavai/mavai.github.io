import React from 'react';
import { mount } from 'enzyme';
import Task from './Task';
import { Card } from 'semantic-ui-react';

describe('<Task />', () => {
  const task = {
    name: 'Test name',
    description: 'Test description'
  };

  it('renders content correctly', () => {
    const wrapper = mount(<Task task={task} />);
    expect(wrapper.find(Card.Header).text()).toEqual(task.name);
    expect(wrapper.find(Card.Description).text()).toEqual(task.description);
  });

  it('removeTask calls the prop function with correct arguments', () => {
    const mockRemove = jest.fn();
    const wrapper = mount(<Task task={task} removeTask={mockRemove} />);
    wrapper.instance().removeTask();
    expect(mockRemove.mock.calls.length).toEqual(1);
    expect(mockRemove.mock.calls[0][0]).toEqual(task);
  });

  it('update calls the prop function with correct arguments', () => {
    const mockUpdate = jest.fn();
    const wrapper = mount(<Task task={task} updateTask={mockUpdate} />);
    wrapper.instance().updateTask();
    expect(mockUpdate.mock.calls.length).toEqual(1);
    expect(mockUpdate.mock.calls[0][0]).toEqual({ ...task, editMode: true });
    expect(mockUpdate.mock.calls[0][1]).toEqual(false);
  });
});