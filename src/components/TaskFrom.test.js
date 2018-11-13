import React from 'react';
import { mount, shallow } from 'enzyme';
import { TaskForm, FormikTaskForm, handleSubmit } from './TaskForm';
import { Dropdown } from 'semantic-ui-react';

describe('<TaskForm />', () => {
  const values = {
    name: '',
    description: '',
    status: ''
  };
  const statuses = [
    { id: 1, name: 'Test status 1' },
    { id: 1, name: 'Test status 2' }
  ];
  let wrapper;
  let mockChange = jest.fn();
  let mockSubmit = jest.fn();
  let mockCancel = jest.fn();
  let mockSetFieldValue = jest.fn();
  beforeAll(() => {
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

  it('status dropdown is formed crrectly', () => {
    const dropdownList = wrapper.instance().getStatusDropdown(statuses);
    expect(dropdownList.length).toEqual(statuses.length);
    const { key, text, value } = dropdownList[0];
    expect(key).toEqual('Test status 1');
    expect(text).toEqual('Test status 1');
    expect(value).toEqual(1);
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

  it('onCancel is called when canceö is pressed', () => {
    wrapper.find('.cancel').first().simulate('click');
    expect(mockCancel.mock.calls.length).toEqual(1);
  });

  describe('<FormikTaskForm />', () => {
    it('initial values are correct when none provided', () => {
      const wrapper = shallow(
        <FormikTaskForm />);
      expect(wrapper.dive().find(TaskForm).prop('values')).toEqual(values);
    });

    it('when form is submitted onSubmit is called with correct parameter', () => {
      mockSubmit = jest.fn();
      handleSubmit(values, { props: { onSubmit: mockSubmit } });
      expect(mockSubmit.mock.calls.length).toEqual(1);
    });
  });
});