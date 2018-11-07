import React from 'react';
import { shallow } from 'enzyme';
import { NavBar } from './NavBar';

describe.only('<NavBar />', () => {
  it('renders content', () => {
    const expectedLinks = [
      'Info',
      'Taskboard',
      'New task'
    ];

    const navBar = shallow(<NavBar />);
    const navigationLinks = navBar.find('.nav-link');
    const names = navigationLinks.map(link => link.prop('name'));

    expect(names.length).toBe(3);
    expectedLinks.forEach(link => {
      expect(names).toContain(link);
    });
  });
});