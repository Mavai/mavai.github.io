import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import { withFormik } from 'formik';

export class UserForm extends React.PureComponent {
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
        <Form.Input
          className="form-field"
          label="Username"
          onChange={handleChange}
          value={values.username}
          name="username"
        />
        <Form.Input
          id="signup-password-field_"
          className="form-field"
          label="Password"
          onChange={handleChange}
          value={values.password}
          name="password"
          type="password"
          autoComplete="new-password"
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
    const { name = '', username = '', password = '' } = initialValues;
    return { name, username, password };
  },
  handleSubmit
})(UserForm);
