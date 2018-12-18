import React from 'react';
import { shallow } from 'enzyme';
import { StatusColumn } from './StatusColumn';
import Task from '../Task/Task';

describe('<StatusColumn />', () => {
  let wrapper;
  let mockRemove = jest.fn();
  let mockUpdate = jest.fn();
  const status = { id: 1, name: 'Finished' };
  const tasks = {
    '1': { id: 1, name: 'Test task 1' },
    '2': { id: 1, name: 'Test task 2' }
  };
  const column = ['1', '2'];
  beforeAll(() => {
    wrapper = shallow(
      <StatusColumn
        status={status}
        tasks={tasks}
        column={column}
        removeTask={mockRemove}
        updateTask={mockUpdate}
      />
    );
  });

  it('renders all tasks', () => {
    expect(wrapper.find('.draggable-task')).toHaveLength(column.length);
  });

  it('renders tasks with correct props', () => {
    const draggable = wrapper.find('Connect(Draggable)').first();
    const taskWrapper = shallow(draggable.prop('children')({})).find(Task);
    expect(taskWrapper.first().prop('removeTask')).toEqual(mockRemove);
    expect(taskWrapper.first().prop('updateTask')).toEqual(mockUpdate);
  });
});
