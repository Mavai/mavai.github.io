import React from 'react';
import { shallow } from 'enzyme';
import { NavBar } from './NavBar';

describe.only('<NavBar />', () => {
  it('renders content', () => {
    const expectedLinks = ['Info'];

    const navBar = shallow(<NavBar />);
    const navigationLinks = navBar.find('.nav-link');
    const names = navigationLinks.map(link => link.prop('name'));

    expect(names.length).toBe(4);
    expectedLinks.forEach(link => {
      expect(names).toContain(link);
    });
    expect(navBar.find('TaskDropdown')).toHaveLength(1);
    expect(navBar.find('Connect(ProjectDropdown)')).toHaveLength(1);
  });
});
