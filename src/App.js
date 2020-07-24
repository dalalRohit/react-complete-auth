import React from "react";
import { Switch, Route } from "react-router-dom";

import Login from "./components/Login";
import Signup from "./components/Signup";
import Dash from "./components/Dash";
import Info from "./components/Info";
// import Demo from "./components/Demo";
import Logout from "./components/Logout";

function App() {
  return (
    <Switch>
      <Route path="/dashboard" exact>
        <Dash />
      </Route>

      <Route path="/login" exact>
        <Login />
      </Route>

      <Route path="/register" exact>
        <Signup />
      </Route>

      <Route path="/logout" exact>
        <Logout total={false} />
      </Route>

      <Route path="/logoutall" exact>
        <Logout total={true} />
      </Route>

      <Route path="/">
        <Info />
      </Route>
    </Switch>
  );
}

export default App;
