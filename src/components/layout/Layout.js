import React from "react";
import Header from "./../Header";
import { withRouter } from "react-router-dom";

function Layout(props) {
  return (
    <div className="App">
      <Header />
      <main>{props.children}</main>
    </div>
  );
}
export default withRouter(Layout);
