import React, { useEffect } from "react";
import Header from "../Header";
import { connect } from "react-redux";
import { chechAuth } from "../../store/actions/type";
import { Redirect } from "react-router";

function AuthLayout(props) {
  useEffect(() => {
    if (!props.user) {
      props.checkAuth();
    }
  }, []);

  return props.isAuth ? (
    <div className="App">
      <Header auth={props.isAuth} />
      <main>{props.children}</main>
    </div>
  ) : (
    <Redirect to="/login" />
  );
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.auth === true,
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkAuth: () => dispatch(chechAuth()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AuthLayout);
