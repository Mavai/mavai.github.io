import React from 'react';
import { Modal } from 'semantic-ui-react';
import EditTaskForm from './EditTaskForm';

const EditTaskModal = props => {
  const { task } = props;
  return (
    <Modal open={task.editMode}>
      <Modal.Header>Edit task</Modal.Header>
      <Modal.Content>
        <EditTaskForm task={task} />
      </Modal.Content>
    </Modal>
  );
};

export default EditTaskModal;
