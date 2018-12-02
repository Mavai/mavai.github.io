import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class TaskDropdown extends React.PureComponent {
  render = () => {
    return (
      <Dropdown item simple text="Tasks">
        <Dropdown.Menu>
          <Dropdown.Item
            name="Backlog"
            text="Backlog"
            className="nav-link"
            as={Link}
            to="/backlog"
            active={false}
          />
          <Dropdown.Item
            name="New task"
            text="New task"
            className="nav-link"
            as={Link}
            to="/create"
            active={false}
          />
        </Dropdown.Menu>
      </Dropdown>
    );
  };
}

export default TaskDropdown;
