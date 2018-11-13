import React from 'react';
import { shallow } from 'enzyme';
import TaskControls from './TaskControls';

describe('<TaskControls />', () => {
  let wrapper;
  let mockRemove = jest.fn();
  let mockUpdate = jest.fn();
  beforeAll(() => {
    wrapper = shallow(
      <TaskControls
        removeTask={mockRemove}
        editTask={mockUpdate}
      />
    );
  });

  it('editTask is called when edit icon is clicked', () => {
    const button = wrapper.find('[name="edit"]');
    button.simulate('click');
    expect(mockUpdate.mock.calls.length).toEqual(1);
  });

  it('removeTask is called when delete icon is clicked', () => {
    const button = wrapper.find('[name="delete"]');
    button.simulate('click');
    expect(mockRemove.mock.calls.length).toEqual(1);
  });
});