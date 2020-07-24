import React, { useEffect } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as Yup from "yup";
import { Formik, ErrorMessage } from "formik";
import { TextField, Button } from "@material-ui/core";

import Layout from "./layout/Layout";

import { register, clearFlash } from "./../store/actions/type";
import Flash from "./flash";
import Spinner from "./Spinner";

const schema = Yup.object().shape({
  username: Yup.string().required("Username is Required"),
  email: Yup.string().email().required("Email Id is Required"),
  password: Yup.string()
    .min(6, "Minimum 6 chars")
    .required("Password is Required"),
  password2: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match!"
  ),
});

//Actions
const Signup = (props) => {
  useEffect(() => {
    if (props.flash.page !== "register" && props.flash.msg !== "") {
      props.clearFlash();
    }
  }, []);

  const data = [
    { id: 12432, name: "username", type: "text" },
    { id: 12879132, name: "email", type: "email" },
    { id: 182, name: "password", type: "password" },
    { id: 12, name: "password2", type: "password" },
  ];
  const { flash } = props;
  if (props.isRegister) {
    return <Redirect to="/login" />;
  }

  return (
    <Layout>
      <h2>Register User</h2>

      {flash.msg ? <Flash type={flash.type} text={flash.msg} /> : null}

      <Formik
        initialValues={{
          username: "",
          password: "",
          email: "",
          password2: "",
        }}
        validationSchema={schema}
        onSubmit={(values) => {
          props.register(values);
        }}
      >
        {(formProps) => {
          const { errors } = formProps;
          const { loading } = props;

          return !loading ? (
            <form className="form" onSubmit={formProps.handleSubmit}>
              {data.map(({ name, type, id }) => {
                return (
                  <div className="field" key={id}>
                    <TextField
                      id={name}
                      type={type}
                      label={name.toLocaleUpperCase()}
                      onBlur={formProps.handleBlur}
                      autoComplete="none"
                      onChange={formProps.handleChange}
                      value={formProps.values[name]}
                    />
                    <ErrorMessage
                      name={name}
                      render={(msg) => (
                        <span className="field-error">{msg}</span>
                      )}
                    />
                  </div>
                );
              })}

              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={Object.keys(errors).length === 0 ? false : true}
                onClick={formProps.handleSubmit}
              >
                Register
              </Button>
            </form>
          ) : (
            <Spinner />
          );
        }}
      </Formik>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    isRegister: state.auth.register,
    loading: state.auth.loading,
    flash: state.flash,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (values) => dispatch(register(values)),
    clearFlash: () => dispatch(clearFlash()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Signup));
