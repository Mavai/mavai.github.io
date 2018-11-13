import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { createTask } from '../reducers/taskReducer';
import { withFormik } from 'formik';
import { selectStatuses } from '../reducers/statusReducer';

export class TaskForm extends React.PureComponent {

  onCancel = (e) => {
    e.preventDefault();
    this.props.onCancel();
  }

  getStatusDropdown = statuses => {
    return statuses.map(status => (
      {
        key: status.name,
        text: status.name,
        value: status.id
      }
    ));
  }

  render() {
    const { statuses, handleChange, setFieldValue, handleSubmit, onCancel, values } = this.props;
    return (
      <Form onSubmit={handleSubmit}>
        <Form.Input
          className='form-field'
          label='Name'
          onChange={handleChange}
          value={values.name}
          name='name'
        />
        <Form.Input
          className='form-field'
          label='Description'
          onChange={handleChange}
          value={values.description}
          name='description'
        />
        <Form.Dropdown
          className='form-field'
          selection
          label='Status'
          options = {this.getStatusDropdown(statuses)}
          onChange={(e, { name, value }) => setFieldValue(name, value)}
          name='status'
          placeholder='Status'
          defaultValue={values.status}
        />
        <Button type='submit'>Submit</Button>
        { onCancel &&
        <Button className='cancel' onClick={this.onCancel}>Cancel</Button> }
      </Form>
    );
  }
}

TaskForm.defaultProps = {
  statuses: []
};

export const handleSubmit = ( values, { props }) => {
  props.onSubmit(values);
};

export const FormikTaskForm = withFormik({
  mapPropsToValues: ({ initialValues = {} }) => {
    const { name = '', description = '', status = {} } = initialValues;
    return {
      name,
      description,
      status: status.id || ''
    };
  },
  handleSubmit
})(TaskForm);

export default connect(state =>
  ({
    statuses: selectStatuses(state)
  }),
{ createTask }
)(FormikTaskForm);