import React from 'react';
import { shallow } from 'enzyme';
import EditTaskModal from './EditTaskModal';
import { Modal } from 'semantic-ui-react';
import EditTaskForm from './EditTaskForm';

const task = {
  name: 'Test task'
};

describe('<EditTaskModal />', () => {
  it('has correct open status', () => {
    let wrapper = shallow(<EditTaskModal task={task} />);
    expect(wrapper.find(Modal).prop('open')).toBeFalsy();
    wrapper = shallow(<EditTaskModal task={{ ...task, editMode: true }} />);
    expect(wrapper.find(Modal).prop('open')).toBeTruthy();
  });

  it('renders EditTaskForm with correct props', () => {
    const wrapper = shallow(<EditTaskModal task={task} />);
    expect(wrapper.find(EditTaskForm)).toHaveLength(1);
    expect(wrapper.find(EditTaskForm).prop('task')).toEqual(task);
  });
});
