import React, { useState } from "react";
import Layout from "./layout/Layout";
import { TextField, Button } from "@material-ui/core";
import { connect } from "react-redux";
import axios from "axios";
import Change from "./change";
import Spinner from "./Spinner";
import Flash from "./flash";
import { changePassword } from "./../store/actions/creators";
function Forgot(props) {
  const [state, setState] = useState({
    username: "",
    user: false,
    loading: false,
  });

  const changeState = (newState) => {
    setState({
      ...state,
      ...newState,
    });
  };

  const checkUser = (e) => {
    e.preventDefault();
    changeState({ loading: true });
    axios
      .post("/username", { username: state.username })
      .then((res) => {
        if (res.data.user) {
          changeState({
            username: "",
            user: true,
            loading: false,
            id: res.data.id,
          });
        }
      })
      .catch((err) => {
        changeState({
          user: false,
          loading: false,
        });
        alert("Username does not exists");
      });
  };
  return (
    <Layout>
      <form className="form" onSubmit={(event) => checkUser(event)}>
        <TextField
          type="text"
          id="username"
          label="Enter username"
          onChange={(event) => changeState({ username: event.target.value })}
          value={state.username}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={(event) => checkUser(event)}
          disabled={state.username.length ? false : true}
        >
          Check User
        </Button>
      </form>
      {state.loading ? <Spinner /> : null}
      {state.user ? (
        <>
          <hr />
          <h3>Username exists!</h3>
          <Change
            change={(values) =>
              props.changePassword({ id: state.id, ...values })
            }
          />
        </>
      ) : null}
    </Layout>
  );
}
const mapStateToProps = (state) => {};

const mapDispatchToProps = (dispatch) => {
  return {
    changePassword: (values) => dispatch(changePassword(values)),
  };
};
export default connect(null, mapDispatchToProps)(Forgot);
