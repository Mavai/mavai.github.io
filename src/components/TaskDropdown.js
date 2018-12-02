import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

class TaskDropdown extends React.PureComponent {
  render = () => {
    return (
      <Dropdown item simple text="Tasks">
        <Dropdown.Menu>
          <Dropdown.Item
            name="Backlog"
            text="Backlog"
            className="nav-link"
            as={NavLink}
            exact
            to="/backlog"
            activeClassName="active"
          />
          <Dropdown.Item
            name="New task"
            text="New task"
            className="nav-link"
            as={NavLink}
            exact
            to="/create"
            activeClassName="active"
          />
        </Dropdown.Menu>
      </Dropdown>
    );
  };
}

export default TaskDropdown;
