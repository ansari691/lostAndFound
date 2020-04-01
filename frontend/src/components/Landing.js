import React from "react";
import { Link, Redirect } from 'react-router-dom';
import "./Landing.css";
import { connect } from 'react-redux';
import { clearAd } from '../actions/ad'

const Landing = ({auth : {isAuthenticated} , clearAd }) => {

  if(!isAuthenticated){
    clearAd();
  }
 
  if(isAuthenticated){
    return <Redirect to="/postList" />
  }

  return (
    <div className="landing-hero">
      <div className="text-center border rounded p-sm-5 py-2">
        <h1>Extend a helping hand, Start a revolution</h1>
        <h4>Restoring the faith in humanity</h4>
        <p className="mt-5">No more searching, No more worries <br/> Post ad and relax</p>

        <Link to="/register">
          <button className="btn btn-info btn-lg">Start Here</button>
        </Link>
      </div>

      <h1 className="text-center mt-3">How it works?</h1>
      <div className="text-center row border p-3"> 
        <div className="landing-works border rounded col-md-3 p-3">
          <img
            className="border rounded m-auto p-3"
            width="150px"
            height="150px"
            src={require("../images/magnifying-glass.png")}
            alt="searching"
          />
          <p className='text-justify'>
            Dont worry if you have lost something just post its details and
            photos and search the lost thing in the founds section.
          </p>
        </div>

        <div className="landing-works border rounded col-md-3 p-3">
          <img
            className="border rounded m-auto p-3"
            height="150px"
            width="150px"
            src={require("../images/check.png")}
            alt="searching"
          />
          <p className='text-justify'>
            Found something and want to return it? just post the detials and
            photos and the owner would reach you.
          </p>
        </div>

        <div className="landing-works border rounded p-3 col-md-3 p-3">
          <img
            className="border rounded mx-auto m-auto p-3"
            height="150px"
            width="150px"
            src={require("../images/chat.png")}
            alt="searching"
          />
          <p className='text-justify'>
            Both the persons can chat with each other and with mutual consent
            meet and sort things out.
          </p>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  auth : state.auth
})

export default connect(mapStateToProps, { clearAd })(Landing);