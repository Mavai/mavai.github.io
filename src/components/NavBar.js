import React from 'react';
import { NavLink, withRouter, Link } from 'react-router-dom';
import { Menu, Container, Dropdown } from 'semantic-ui-react';
import ProjectDropdown from './Project/ProjectDropdown';
import TaskDropdown from './Task/TaskDropdown';

export class NavBar extends React.PureComponent {
  render() {
    const options = [
      {
        key: 'Taskboard',
        text: 'Taskboard',
        value: 'Taskboard',
        className: 'nav-link',
        as: Link,
        to: '/taskboard'
      },
      {
        key: 'New taskboard',
        text: 'New taskboard',
        value: 'New taskboard',
        className: 'nav-link',
        as: Link,
        to: '/create_taskboard'
      }
    ];
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
          <Dropdown simple item text="Taskboard" options={options} />
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
