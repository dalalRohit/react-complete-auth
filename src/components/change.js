import React from "react";

import * as Yup from "yup";
import { TextField, Button } from "@material-ui/core";
import { connect } from "react-redux";
import { Formik, ErrorMessage } from "formik";
import { changePassword, clearFlash } from "./../store/actions/creators";

const schema = Yup.object().shape({
  password: Yup.string().required("Password is Required"),
  password_again: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match!"
  ),
});

export default function Change(props) {
  return (
    <Formik
      initialValues={{
        password: "",
        password_again: "",
      }}
      validationSchema={schema}
      onSubmit={(values) => {
        props.change(values);
      }}
    >
      {(formProps) => {
        const { errors } = formProps;
        return (
          <form className="form" onSubmit={formProps.handleSubmit}>
            <TextField
              label="New pswd"
              id="password"
              type="password"
              onChange={formProps.handleChange}
              onBlur={formProps.handleBlur}
              value={formProps.values["password"]}
            />
            <ErrorMessage
              name={"password"}
              render={(msg) => <span className="field-error">{msg}</span>}
            />
            <TextField
              label="New pswd confirm"
              id="password_again"
              type="password"
              onChange={formProps.handleChange}
              onBlur={formProps.handleBlur}
              value={formProps.values["password_again"]}
            />
            <ErrorMessage
              name={"password_again"}
              render={(msg) => <span className="field-error">{msg}</span>}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={formProps.handleSubmit}
              disabled={Object.keys(errors).length === 0 ? false : true}
            >
              Change pswd
            </Button>
          </form>
        );
      }}
    </Formik>
  );
}
