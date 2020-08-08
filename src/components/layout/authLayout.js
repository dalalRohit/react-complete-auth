import React, { useEffect } from "react";
import Header from "../Header";
import { connect } from "react-redux";
import { checkAuth } from "../../store/actions/creators";
import { Redirect } from "react-router";

function AuthLayout(props) {
  useEffect(() => {
    if (!props.user) {
      props.checkAuth();
    }
  }, []);
  if (!props.isAuth) {
    console.log("[authLayout] redirecting to /login");
    return <Redirect to="/login" />;
  }
  return (
    <div className="App">
      <Header auth={props.isAuth} />
      <main>{props.children}</main>
    </div>
  );
}
/*
    <div className="App">
      <Header auth={props.isAuth} />
      <main>{props.children}</main>
    </div>
*/

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
  return {
    checkAuth: () => dispatch(checkAuth()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AuthLayout);
