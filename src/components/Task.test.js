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
});