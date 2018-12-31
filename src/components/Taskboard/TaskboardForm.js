import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import { withFormik } from 'formik';

export class TaskboardForm extends React.PureComponent {
  render = () => {
    const { values, handleSubmit, handleChange } = this.props;
    return (
      <Form onSubmit={handleSubmit}>
        <Form.Input
          className="form-field"
          label="Name"
          onChange={handleChange}
          value={values.name}
          name="name"
        />
        <Button type="submit" color="blue">
          Submit
        </Button>
      </Form>
    );
  };
}

const handleSubmit = (values, { props }) => {
  props.onSubmit(values);
};

export default withFormik({
  mapPropsToValues: ({ initialValues = {} }) => {
    const { name = '' } = initialValues;
    return { name };
  },
  handleSubmit
})(TaskboardForm);
