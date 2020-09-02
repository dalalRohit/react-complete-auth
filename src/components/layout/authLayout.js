import React from "react";
import Header from "../Header";
import { connect } from "react-redux";
import { Redirect } from "react-router";

function AuthLayout(props) {
  if (!props.isAuth) {
    return <Redirect to="/login" />;
  }
  return (
    <div className="App">
      <Header auth={props.isAuth} />
      <main>{props.children}</main>
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log("[authLayout] STATE", state.auth);
  return {
    isAuth: state.auth.auth,
    user: state.auth.user,
    loading: state.auth.loading,
    checked: state.auth.checked,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(AuthLayout);
