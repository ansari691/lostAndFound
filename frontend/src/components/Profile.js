import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { MdAccountBox } from "react-icons/md";

import { updateUser, loadUser } from "../actions/auth";

const Profile = ({ user, updateUser, loadUser }) => {
  console.log(user);

  const [UpdateForm, setUpdateForm] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    password: ""
  });

  const { name, email, phone, password } = UpdateForm;

  const onChange = e =>
    setUpdateForm({ ...UpdateForm, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();

    updateUser(name, phone, email, password);
  };

  // useEffect(() => {
  //    loadUser();
  // },[])

  return (
    <div className="m-auto border shadow-lg" style={{width : "600px"}}>
      <h4 className="text-center">
        <MdAccountBox /> Update Profile
      </h4>
      <form className="px-5 py-3" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="Enter your name"
            value={name}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            name="email"
            placeholder="Enter email"
            value={email}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Mobile number</label>
          <input
            type="number"
            className="form-control"
            name="phone"
            placeholder="Enter 10 digit mobile number"
            value={phone}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password: </label>
          <p className="text-danger">Please enter the old password or select a new password to continue :</p>

          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="Password"
            value={password}
            onChange={e => onChange(e)}
          />
        </div>
        <button
          type={password.length > 5 ? "submit" : "button"}
          className={
            password.length > 5 ? "btn btn-success" : "btn btn-danger disabled"
          }
        >
          Update
        </button>
      </form>
    </div>
  );
};

Profile.propTypes = {
  updateUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps, { updateUser, loadUser })(Profile);
