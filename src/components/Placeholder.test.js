import React from 'react';
import { shallow } from 'enzyme';
import Placeholder from './Placeholder';

describe.only('<Placeholder />', () => {
  it('renders content', () => {
    const wrapper = shallow(<Placeholder />);
    const contentDiv = wrapper.find('.placeholder');

    expect(contentDiv.text()).toContain('Select project');
  });
});
