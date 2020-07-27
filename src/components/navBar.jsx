import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = ({user}) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        Mis tareas
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          
          
          {!user && (
          <React.Fragment>
              <NavLink className="nav-item nav-link" to="/loginForm">
                Login
            </NavLink>
            <NavLink className="nav-item nav-link" to="/registerForm">
                Register
            </NavLink>
          </React.Fragment>)}

          {user && (
          <React.Fragment>
              <NavLink className="nav-item nav-link" to="/todos">
            To do
          </NavLink>
              <NavLink className="nav-item nav-link" to="/todos">
                {user.name}
            </NavLink>
            <NavLink className="nav-item nav-link" to="/logout">
                Logout
            </NavLink>
          </React.Fragment>)}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;