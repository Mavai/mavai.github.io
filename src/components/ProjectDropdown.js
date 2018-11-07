import React from 'react';
import { connect } from 'react-redux';
import { selectProject } from '../reducers/projectReducer';
import { Dropdown } from 'semantic-ui-react';

export class ProjectDropdown extends React.PureComponent {

  render() {
    const { selectedProject, projects, selectProject } = this.props;
    return (
      <Dropdown item text={selectedProject ? selectedProject.name : 'Project'}>
        <Dropdown.Menu>
          {projects.map(project =>
            <Dropdown.Item key={project.name} onClick={() => selectProject(project.id)}>
              {project.name}
            </Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

const mapStateToProps = (state) => {
  const { all: projects, selected } = state.projects;
  return {
    projects,
    selectedProject: projects.find(project => project.id === selected)
  };
};

export default connect(
  mapStateToProps,
  { selectProject }
)(ProjectDropdown);