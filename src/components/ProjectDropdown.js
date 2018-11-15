import React from 'react';
import { connect } from 'react-redux';
import { selectProject } from '../operations/projectOperations';
import { selectProjects, selectCurrentProject } from '../store';
import { Dropdown } from 'semantic-ui-react';

export class ProjectDropdown extends React.PureComponent {

  render() {
    const { selectedProject, projects, selectProject } = this.props;
    return (
      <Dropdown className='dropdown' item text={selectedProject ? selectedProject.name : 'Project'}>
        <Dropdown.Menu>
          {projects.map(project =>
            <Dropdown.Item className='dropdown-item' key={project.name} onClick={() => selectProject(project.id)}>
              {project.name}
            </Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

export default connect(state =>
  ({
    projects: selectProjects(state),
    selectedProject: selectCurrentProject(state)
  }),
{ selectProject }
)(ProjectDropdown);