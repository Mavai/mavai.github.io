import React from 'react';
import { shallow } from 'enzyme';
import { StatusColumn } from './StatusColumn';
import Task from './Task';

describe('<StatusColumn />', () => {
  let wrapper;
  let mockRemove = jest.fn();
  let mockUpdate = jest.fn();
  const status = { id: 1, name: 'Finished' };
  const tasks = [
    { id: 1, name: 'Test task 1' },
    { id: 1, name: 'Test task 2' }
  ];
  beforeAll(() => {
    wrapper = shallow(
      <StatusColumn
        status={status}
        tasks={tasks}
        removeTask={mockRemove}
        updateTask={mockUpdate}
      />
    );
  });

  it('has correct status name as header', () => {
    expect(wrapper.find('h1').text()).toEqual(status.name);
  });

  it('renders all tasks', () => {
    expect(wrapper.find('.draggable-task')).toHaveLength(tasks.length);
  });

  it('renders tasks with correct props', () => {
    const draggable = wrapper.find('Connect(Draggable)').first();
    const taskWrapper = shallow(draggable.prop('children')({})).find(Task);
    expect(taskWrapper.first().prop('removeTask')).toEqual(mockRemove);
    expect(taskWrapper.first().prop('updateTask')).toEqual(mockUpdate);
  });
});