import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { logout } from "./../store/actions/creators";

class Logout extends Component {
  componentDidMount() {
    console.log("[logout] logging out..");
    this.props.logout(this.props.total);
  }

  render() {
    return <Redirect to="/login" />;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: (total) => dispatch(logout(total)),
  };
};
export default connect(null, mapDispatchToProps)(Logout);
