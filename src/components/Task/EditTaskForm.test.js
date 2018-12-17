import React from 'react';
import { shallow } from 'enzyme';
import { EditTaskForm } from './EditTaskForm';
import TaskForm from './TaskForm';

const task = {
  name: 'Test project',
  description: 'Test description',
  status: {
    id: 1
  },
  project: {
    id: 1
  }
};

describe.only('<NewTaskForm />', () => {
  it('renders TaskForm with correct initial values', () => {
    const wrapper = shallow(<EditTaskForm task={task} />);
    expect(wrapper.find(TaskForm)).toHaveLength(1);
    expect(wrapper.find(TaskForm).prop('initialValues')).toEqual(task);
  });

  it('updateTask is called with correct arguments when status is changed', () => {
    const mockUpdate = jest.fn();
    const wrapper = shallow(
      <EditTaskForm task={task} updateTask={mockUpdate} />
    );
    const formData = { ...task, status: 2 };
    wrapper.instance().onSubmit(formData);
    expect(mockUpdate.mock.calls.length).toEqual(1);
    const boardInfo = {
      oldStatus: task.status.id,
      newStatus: formData.status,
      destinationIndex: Infinity
    };
    expect(mockUpdate.mock.calls[0][0]).toEqual({
      ...task,
      ...formData,
      project: task.project.id
    });
    expect(mockUpdate.mock.calls[0][1]).toEqual(true);
    expect(mockUpdate.mock.calls[0][2]).toEqual(boardInfo);
  });

  it('updateTask is called with correct arguments when status is not changed', () => {
    const mockUpdate = jest.fn();
    const wrapper = shallow(
      <EditTaskForm task={task} updateTask={mockUpdate} />
    );
    const formData = { ...task, status: 1 };
    wrapper.instance().onSubmit(formData);
    expect(mockUpdate.mock.calls.length).toEqual(1);
    expect(mockUpdate.mock.calls[0][0]).toEqual({
      ...task,
      ...formData,
      project: task.project.id
    });
    expect(mockUpdate.mock.calls[0][1]).toEqual(true);
    expect(mockUpdate.mock.calls[0][2]).toEqual(null);
  });

  it('stopTaskEdit calls updateTask with correct parameters', () => {
    const mockUpdate = jest.fn();
    const wrapper = shallow(
      <EditTaskForm task={task} updateTask={mockUpdate} />
    );
    wrapper.instance().stopTaskEdit(task)();
    expect(mockUpdate.mock.calls).toHaveLength(1);
    expect(mockUpdate.mock.calls[0][0]).toEqual({ ...task, editMode: false });
    expect(mockUpdate.mock.calls[0][1]).toEqual(false);
  });
});
