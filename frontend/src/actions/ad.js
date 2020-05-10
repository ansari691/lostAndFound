import {
  POST_AD_SUCCESS,
  POST_AD_ERROR,
  GET_AD,
  GET_AD_FAILED,
  GET_AD_BY_ID,
  GET_AD_BY_ID_FAILED,
  CLEAR_AD,
  DELETE_AD
} from "./types";
import axios from "axios";
import { setAlert } from "../actions/alert";

//POSTING AN AD
export const postAd = fd => async dispatch => {
  try {
    const res = await axios.post("http://localhost:5000/api/postAd", fd); //body ,config);

    dispatch({
      type: POST_AD_SUCCESS,
      payload: res.data
    });

    console.log(fd);

    dispatch(setAlert("Ad posted successfully", "success"));
    setTimeout("location.reload(true);", 1000)
  } catch (err) {
    const errors = err.response.data.errors;
    console.log(err);

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: POST_AD_ERROR
    });
  }
};

//getting all ads
export const getAllAds = () => async dispatch => {
  try {
    const res = await axios.get("http://localhost:5000/api/postAd");

    dispatch({
      type: GET_AD,
      payload: res.data
    });
  } catch (err) {
    console.log("get ad failed");
    // const errors = err.data.response.errors;

    // if(errors){
    //     errors.forEach(error => {
    //         setAlert(error.msg, 'danger');
    //     })
    // }

    dispatch({
      type: GET_AD_FAILED
    });
  }
};

//getting ad by id
export const getAdById = id => async dispatch => {
  try {
    const res = await axios.get(`http://localhost:5000/api/postAd/${id}`);

    dispatch({
      type: GET_AD_BY_ID,
      payload: res.data
    });

    console.log(res.data);
  } catch (err) {
    dispatch({
      type: GET_AD_BY_ID_FAILED
    });
    console.log("get ad by id failed");
  }
};

export const clearAd = () => dispatch => {
  dispatch({
    type: CLEAR_AD
  });
};

export const deleteAd = id => async dispatch => {

  await axios.delete(`http://localhost:5000/api/postAd/${id}`);

  dispatch({
    type: DELETE_AD
  });
  dispatch(setAlert('Ad deleted successfully', 'success'));
  //return <Redirect to="/postList" />
};
