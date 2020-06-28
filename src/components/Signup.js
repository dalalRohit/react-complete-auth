import React from "react";
import { useFormik } from "formik";
import { TextField, Button } from "@material-ui/core";

const signup = () => {
  return (
    <form className="form">
      <TextField type="text" label="Username" />
      <TextField type="password" label="Password" />
      <Button
        type="submit"
        variant="contained"
        color="primary"
      >
        Register
      </Button>
    </form>
  );
};

export default signup;
