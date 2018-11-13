import React from 'react';
import { shallow } from 'enzyme';
import { StatusColumn } from './StatusColumn';

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
    expect(wrapper.find('.draggable-task').length).toEqual(tasks.length);
  });
});