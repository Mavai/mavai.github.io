import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { Menu, Container } from 'semantic-ui-react';
import ProjectDropdown from './ProjectDropdown';

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
          <Menu.Item
            name="Taskboard"
            className="nav-link"
            as={NavLink}
            exact
            to="/taskboard"
            activeClassName="active"
          />
          <Menu.Item
            name="New task"
            className="nav-link"
            as={NavLink}
            exact
            to="/create"
            activeClassName="active"
          />
          <ProjectDropdown />
        </Container>
      </Menu>
    );
  }
}

export default withRouter(NavBar);
