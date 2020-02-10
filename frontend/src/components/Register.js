import React, { useState } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MdAccountBox} from 'react-icons/md';


import { setAlert } from '../actions/alert';
import { register } from '../actions/auth' 

const Register = ( {setAlert ,register, isAuthenticated } )  => {

  const [RegisterForm, setRegisterForm] = useState({
    name : '',
    email : '',
    phone : '',
    password : ''
  });

  const {name, email, phone, password } = RegisterForm;

  const onChange = e => 
    setRegisterForm({ ...RegisterForm, [e.target.name] : e.target.value});

  
  const onSubmit = async e => {
    e.preventDefault();
    
    register({name, email, phone, password});
  }




  return (
    <div className="mt-3 border shadow-lg">
        <h4 className='text-center'><MdAccountBox /> Register</h4>
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
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="Password"
            value={password}
            onChange={e => onChange(e)}
          />
        </div>
        <button type="submit" className="btn btn-success mt-2">
          Submit
        </button>
      </form>
    </div>
  );
};

Register.propTypes = {
  setAlert : PropTypes.func.isRequired,
  register : PropTypes.func.isRequired,
  isAuthenticated : PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated : state.auth.isAuthenticated
});

export default connect( mapStateToProps, { setAlert, register } )(Register);


