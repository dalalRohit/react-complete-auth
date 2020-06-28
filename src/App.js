import React from "react";
import { withRouter, Switch } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import Signup from "./components/Signup";

import { useParams, Route, NavLink } from "react-router-dom";

// function Child() {
//   let { id } = useParams();
//   return <h1>{id}</h1>;
// }

function App(props) {
  return (
    <div className="App">
      <Header />
      <main>
        <h2>Complete user auth {props.location.pathname} </h2>

        <Switch>
          <Route path="/login" exact>
            <Login />
          </Route>

          <Route path="/register" exact>
            <Signup />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default withRouter(App);
