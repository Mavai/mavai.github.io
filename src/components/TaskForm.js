import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { createTask } from '../operations/taskOperations';
import { withFormik } from 'formik';
import { selectStatuses, selectCurrentProject } from '../store';

export class TaskForm extends React.PureComponent {
  getStatusDropdown = statuses => {
    return statuses.map(status => ({
      key: status.name,
      text: status.name,
      value: status.id
    }));
  };

  getTaskboardDopdown = project => {
    if (!project || !project.taskboards) return [];
    const options = project.taskboards.map(taskboard => ({
      key: taskboard.id,
      text: taskboard.name,
      value: taskboard.id
    }));
    return [
      { key: 'backlog', text: 'Backlog', value: 'taskboard' },
      ...options
    ];
  };

  render() {
    const {
      statuses,
      handleChange,
      setFieldValue,
      handleSubmit,
      onCancel,
      onDelete,
      values,
      project
    } = this.props;
    return (
      <Form onSubmit={handleSubmit}>
        <Form.Input
          className="form-field"
          label="Name"
          onChange={handleChange}
          value={values.name}
          name="name"
        />
        <Form.Input
          className="form-field"
          label="Description"
          onChange={handleChange}
          value={values.description}
          name="description"
        />
        <Form.Dropdown
          className="form-field"
          selection
          label="Status"
          options={this.getStatusDropdown(statuses)}
          onChange={(e, { name, value }) => setFieldValue(name, value)}
          name="status"
          placeholder="Status"
          defaultValue={values.status}
        />
        <Form.Dropdown
          className="form-field"
          selection
          clearable
          label="Taskboard"
          options={this.getTaskboardDopdown(project)}
          onChange={(e, { name, value }) => setFieldValue(name, value)}
          name="taskboard"
          placeholder="Taskboard"
          defaultValue={values.taskboard}
          disabled={values.backlog}
        />
        <Button type="submit" color="blue">
          Submit
        </Button>
        {onCancel && (
          <Button type="button" className="cancel" onClick={onCancel}>
            Cancel
          </Button>
        )}
        {onDelete && (
          <Button
            type="button"
            color="red"
            className="delete"
            style={{ float: 'right' }}
            onClick={onDelete}
          >
            Delete
          </Button>
        )}
      </Form>
    );
  }
}

TaskForm.defaultProps = {
  statuses: []
};

export const handleSubmit = (values, { props }) => {
  props.onSubmit(values);
};

export const FormikTaskForm = withFormik({
  mapPropsToValues: ({ initialValues = {} }) => {
    const {
      name = '',
      description = '',
      status = {},
      taskboard = ''
    } = initialValues;
    return {
      name,
      description,
      taskboard,
      status: status.id || ''
    };
  },
  handleSubmit
})(TaskForm);

export default connect(
  state => ({
    statuses: selectStatuses(state),
    project: selectCurrentProject(state)
  }),
  { createTask }
)(FormikTaskForm);
