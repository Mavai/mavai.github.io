import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { Menu, Container } from 'semantic-ui-react';
import ProjectDropdown from './Project/ProjectDropdown';
import TaskDropdown from './Task/TaskDropdown';

export class NavBar extends React.PureComponent {
  render() {
    return (
      <Menu fixed="top" size="huge">
        <Container>
          <Menu.Item
            name="Info"
            className="nav-link"
            as={NavLink}
            exact
            to="/"
            activeClassName="active"
          />
          <TaskDropdown />
          <Menu.Item
            name="Taskboard"
            className="nav-link"
            as={NavLink}
            exact
            to="/taskboard"
            activeClassName="active"
          />
          <Menu.Item
            name="Create project"
            className="nav-link"
            as={NavLink}
            exact
            to="/new_project"
            activeClassName="active"
          />
          <ProjectDropdown />
          <Menu.Item
            name="Login"
            className="nav-link"
            as={NavLink}
            exact
            to="/login"
            activeClassName="active"
          />
          <Menu.Item
            name="Register"
            className="nav-link"
            as={NavLink}
            exact
            to="/new_user"
            activeClassName="active"
          />
        </Container>
      </Menu>
    );
  }
}

export default withRouter(NavBar);
