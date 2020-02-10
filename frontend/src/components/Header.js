import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  MdAccountBox,
  MdTrendingFlat,
  MdAddAPhoto,
  MdExitToApp,
  MdAssignmentInd
} from "react-icons/md";
import { GoHome } from "react-icons/go";

import { logout } from "../actions/auth";
import "./Header.css";

const Header = ({
  auth: { isAuthenticated, loading },
  logout,
  darkMode,
  blackAndWhite
}) => {
  const guestLink = (
    <Fragment>
      <Link className="mr-2" to="/register">
        <button className="btn btn-success rounded-pill">
          <MdAccountBox />
          Register
        </button>
      </Link>
      <Link to="/login">
        <button className="btn btn-success rounded-pill">
          <MdTrendingFlat />
          Login
        </button>
      </Link>
    </Fragment>
  );

  const authLink = (
    <Fragment>
      <Link to="/postList">
        <GoHome /> <span id="hide">Home</span>
      </Link>
      <Link to="/profile">
        <MdAssignmentInd /> <span id="hide">Profile</span>
      </Link>
      <Link to="/postAd">
        <MdAddAPhoto /> <span id="hide">PostAd</span>
      </Link>
      <Link onClick={logout} to="/">
        <MdExitToApp /> <span id="hide">Logout</span>
      </Link>
    </Fragment>
  );

  return (
    <nav
      className="d-flex justify-content-between"
      // style={
      //   darkMode
      //     ? { backgroundColor: "black", height : "100px" }
      //     : { backgroundColor: "whitesmoke", height : "100px"}
      // }
    >
      <Link to={isAuthenticated ? "/postList" : "/"} className="m-auto">
        <img
          src={
            darkMode || blackAndWhite
              ? require("../images/black.png")
              : require("../images/white.jpg")
          }
          alt="logo"
          height="70px"
          className="border"
        />
      </Link>

      <div
        className={darkMode || blackAndWhite ? "header-black" : "header-white"}
      >
        {!loading && isAuthenticated ? authLink : guestLink}
      </div>
    </nav>
  );
};

Header.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Header);
