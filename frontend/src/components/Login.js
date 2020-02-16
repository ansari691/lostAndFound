import React, { useState } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types'; 
import { login } from '../actions/auth';
import { Redirect } from "react-router-dom";
import { MdTrendingFlat } from 'react-icons/md';



const Login = ({ login, isAuthenticated }) => { 


  const [ loginFormData, setLoginFormData ] = useState({
    email : '',
    password : ''
  });
  
  const { email, password } = loginFormData;
  
  const onChange = e => 
    setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
  
  const onSubmit = async e =>{
    e.preventDefault();
  
    login(email, password);
  }

  if(isAuthenticated){
    return <Redirect to='/postList' />
  }
  
  return (
    <div style={{ marginBottom : "100px"}} className="forms m-auto border shadow-lg">
        <h3 className="text-center"> <MdTrendingFlat />Login</h3>
      <form className="px-5 py-3" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Enter email"
            onChange={e => onChange(e)}
            value={email}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="Password"
            onChange={e => onChange(e)}
            value={password}
          />
        </div>
        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </form>
    </div>
  );
};

Login.propTypes = {
  login : PropTypes.func.isRequired,
  isAuthenticated : PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated : state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login);
