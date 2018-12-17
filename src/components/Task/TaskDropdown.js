import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class TaskDropdown extends React.PureComponent {
  render = () => {
    const options = [
      {
        key: 'Backlog',
        text: 'Backlog',
        value: 'Backlog',
        className: 'nav-link',
        as: Link,
        to: '/backlog'
      },
      {
        key: 'New task',
        text: 'New task',
        value: 'New task',
        className: 'nav-link',
        as: Link,
        to: '/create'
      }
    ];
    return <Dropdown simple item text="Tasks" options={options} />;
  };
}

export default TaskDropdown;
