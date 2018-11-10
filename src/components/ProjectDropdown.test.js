import React from 'react';
import { shallow } from 'enzyme';
import { ProjectDropdown } from './ProjectDropdown';
import { Dropdown } from 'semantic-ui-react';

const projects = [
  {
    id: 1,
    name: 'Test project 1'
  },
  {
    id: 2,
    name: 'Test project 2'
  }
];
const selectedProject = projects[0];

describe.only('<ProjectDropdown />', () => {
  it('renders selected correctly when project is not selected', () => {
    const wrapper = shallow(
      <ProjectDropdown
        projects={projects}
      />
    );
    const dropdown = wrapper.find(Dropdown);

    expect(dropdown.prop('text')).toContain('Project');
  });

  it('renders selected correctly when project is selected', () => {
    const wrapper = shallow(
      <ProjectDropdown
        selectedProject={selectedProject}
        projects={projects}
      />
    );
    const dropdown = wrapper.find(Dropdown);

    expect(dropdown.prop('text')).toContain('Test project 1');
  });

  it('renders all selectable projects as options', () => {
    const wrapper = shallow(
      <ProjectDropdown
        selectedProject={selectedProject}
        projects={projects}
      />
    );
    const items = wrapper.find(Dropdown.Item).map(item => item.dive().text());

    expect(items.length).toEqual(2);
    projects.forEach(project => {
      expect(items).toContain(project.name);
    });
  });

  it('selectProject is called with correct parameter', () => {
    const clickHandler = jest.fn();
    const wrapper = shallow(
      <ProjectDropdown
        selectedProject={selectedProject}
        projects={projects}
        selectProject={clickHandler}
      />
    );
    const items = wrapper.find(Dropdown.Item).map(item => item.dive());
    items[0].simulate('click');
    expect(clickHandler.mock.calls.length).toEqual(1);
    expect(clickHandler.mock.calls[0][0]).toEqual(1);
  });
});