import React from 'react';
import { Icon, Button } from 'semantic-ui-react';

const TaskControls = props => {

  const { editTask } = props;
  return (
    <div style={{ marginTop: 5 }}>
      <Button icon basic size='mini' onClick={editTask} style={{ float: 'right' }}>
        <Icon size='large' name='ellipsis horizontal'></Icon>
      </Button>
    </div>
  );
};

export default TaskControls;