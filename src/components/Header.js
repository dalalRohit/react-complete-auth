import React, { Component } from "react";
import { Link, NavLink, withRouter } from "react-router-dom";

class Header extends Component {
  render() {
    const links = ["Login", "Register"];
    const authLinks = ["Dashboard", "Logout", "Logout All"];

    return (
      <header className="header">
        <Link className="logo" to={this.props.auth ? "/dashboard" : "/"}>
          <h2>UserAuth</h2>
        </Link>

        <ul className="nav">
          {!this.props.auth
            ? links.map((link) => {
                return (
                  <NavLink key={Math.random()} to={`/${link.toLowerCase()}`}>
                    <li>{link}</li>
                  </NavLink>
                );
              })
            : authLinks.map((authLink) => {
                return (
                  <NavLink
                    key={Math.random()}
                    to={`/${authLink.toLowerCase().replace(/\s/g, "")}`} //removes white space from "logout all" -> "logoutall"
                  >
                    <li>{authLink}</li>
                  </NavLink>
                );
              })}
        </ul>
      </header>
    );
  }
}

export default withRouter(Header);
