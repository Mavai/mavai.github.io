import React from 'react';
import { mount } from 'enzyme';
import { TaskForm } from './TaskForm';
import { Dropdown } from 'semantic-ui-react';

describe('<TaskForm />', () => {
  const values = {
    name: '',
    description: '',
    status: ''
  };
  let wrapper;
  let mockChange = jest.fn();
  let mockSubmit = jest.fn();
  let mockCancel = jest.fn();
  let mockSetFieldValue = jest.fn();
  beforeEach(() => {
    wrapper = mount(
      <TaskForm
        handleChange={mockChange}
        handleSubmit={mockSubmit}
        onCancel={mockCancel}
        values={values}
        setFieldValue={mockSetFieldValue}
      />
    );
  });

  it('handleChange is called when any inpput value changes', () => {
    wrapper.find('input').forEach(field => {
      field.simulate('change');
    });
    expect(mockChange.mock.calls.length).toEqual(2);
  });

  it('setFieldValue is called when any dropdown is changed', () => {
    wrapper.find(Dropdown).forEach(field => {
      field.simulate('change');
    });
    expect(mockSetFieldValue.mock.calls.length).toEqual(1);
  });

  it('handleSubmit is called with formData when the form is submitted', () => {
    wrapper.find('form').simulate('submit');
    expect(mockSubmit.mock.calls.length).toEqual(1);
  });
});