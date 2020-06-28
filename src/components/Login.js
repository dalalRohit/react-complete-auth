import React, { useState } from "react";
import axios from "axios";

import { useFormik } from "formik";
import { TextField, Button } from "@material-ui/core";
import { withRouter } from "react-router";

const Login = (props) => {
  const [process, setProcess] = useState(false);
  let formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      //   alert(JSON.stringify(values, null, 2));
      setProcess(true);
      axios
        .post("http://localhost:5000/login", {
          username: values.username,
          password: values.password,
        })
        .then((res) => {
          alert(`Login ${JSON.stringify(res.data)}`);
          window.localStorage.setItem("token", res.headers["auth-token"]);
          setProcess(false);
          props.history.push(`/post/${res.data.user}`);
        })
        .catch((err) => {
          console.log(err);
          setProcess(false);
        });
    },
  });
  return (
    <form className="form" autoComplete="off" onSubmit={formik.handleSubmit}>
      <TextField
        id="username"
        type="text"
        label="Username"
        autoComplete="none"
        onChange={formik.handleChange}
        value={formik.values.username}
      />
      <TextField
        id="password"
        type="password"
        label="Password"
        autoComplete="on"
        onChange={formik.handleChange}
        value={formik.values.password}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={process}
      >
        Login
      </Button>
    </form>
  );
};

export default withRouter(Login);
