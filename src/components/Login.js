import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as Yup from "yup";
import { Formik, ErrorMessage } from "formik";
import { TextField, Button } from "@material-ui/core";

import Layout from "./layout/Layout";
import { login, clearFlash } from "./../store/actions/type";
import Flash from "./flash";
import Spinner from "./Spinner";

const schema = Yup.object().shape({
  username: Yup.string().required("Username is Required"),
  password: Yup.string()
    .min(6, "Minimum 6 chars")
    .required("Password is Required"),
});

//Actions
const Login = (props) => {
  useEffect(() => {
    if (props.flash.page !== "login" && props.flash.msg !== "") {
      props.clearFlash();
    }
  }, []);

  const { flash } = props;
  const data = [
    { id: 12432, name: "username", type: "text" },
    { id: 182, name: "password", type: "password" },
  ];

  if (props.auth) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <Layout>
      <h2>Login User</h2>
      {flash.msg ? <Flash type={flash.type} text={flash.msg} /> : null}
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        validationSchema={schema}
        onSubmit={(values) => {
          props.login(values);
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
                      label={name.toUpperCase()}
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
                Login
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
    auth: state.auth.auth,
    token: state.auth.token,
    loading: state.auth.loading,
    user: state.auth.user,
    flash: state.flash,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (values) => dispatch(login(values)),
    clearFlash: () => dispatch(clearFlash()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
