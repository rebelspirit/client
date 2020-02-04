import React, {useContext} from 'react';
import {NavLink, useHistory} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

export const Navbar = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);

  const logoutHandler = event => {
      event.preventDefault();
      auth.logout();
      history.push("/");
  };

  return (
      <nav>
          <div className="nav-wrapper">
              <NavLink to="/dashboard" className="brand-logo"> <div className={"logo"}/>tracker</NavLink>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                  <li><a href="/" onClick={logoutHandler}>Logout<i className="material-icons">keyboard_return</i></a></li>
              </ul>
          </div>
      </nav>
  )
};