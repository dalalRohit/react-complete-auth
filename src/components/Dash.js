import React, { useEffect } from "react";
import AuthLayout from "./layout/authLayout";
// import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { changePassword, clearFlash } from "./../store/actions/creators";
import Flash from "./flash";
import Change from "./change";

function Dash(props) {
  const flash = props.flash;

  useEffect(() => {
    if (props.flash.page !== "dash" && props.flash.msg !== "") {
      props.clearFlash();
    }
  }, []);

  return (
    <AuthLayout>
      {flash.msg ? <Flash type={flash.type} text={flash.msg} /> : null}
      <h2>This is your Dashboard</h2>
      <h4>Change you password</h4>
      <Change change={(values) => props.changePassword(values)} />
    </AuthLayout>
  );
}

const mapStateToProps = (state) => {
  return {
    flash: state.flash,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    changePassword: (values) => dispatch(changePassword(values)),
    clearFlash: () => dispatch(clearFlash()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Dash);
