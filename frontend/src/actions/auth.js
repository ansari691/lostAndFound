import axios from "axios";

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  UPDATE_USER
} from "./types";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";

//GETTING A USER
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("http://localhost:5000/api/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: AUTH_ERROR
    });
  }
};

//REGISTERING A USER
export const register = ({
  name,
  email,
  phone,
  password
}) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ name, email, phone, password });

  try {
    const res = await axios.post(
      "http://localhost:5000/api/users",
      body,
      config
    );

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    //dispatch(loadUser());

    dispatch(setAlert("Registered successfully login now", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: REGISTER_FAIL
    });
  }
};

//LOGGING IN A USER
export const login = (email, password) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth",
      body,
      config
    );

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

//LOGOUT
export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
};

//UPDATING A USER
export const updateUser = (name, phone, email, password) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({
    name,
    phone,
    email,
    password
  });

  console.log("error above axios.put");

  try {
      console.log("inside try");
    const res = await axios.put(
      "http://localhost:5000/api/users",
      body,
      config
    );

    dispatch({
      type: UPDATE_USER,
      payload: res.data
    });

    dispatch(setAlert("Updated successfully", "success"));

    dispatch(loadUser());

  } catch (err) {
      console.log(err);
  }
};
