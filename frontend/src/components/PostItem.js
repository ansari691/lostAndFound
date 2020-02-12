import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import "./PostItem.css";
import { getAdById } from "../actions/ad";
import { deleteAd } from "../actions/ad";

const PostItem = ({
  getAdById,
  deleteAd,
  ad: { post, loading, deleted },
  location
}) => {
  const { id } = location.state;

  useEffect(() => {
    getAdById(id);
  }, []);

  if (deleted) {
    setTimeout("location.reload(true);", 1000);
    return <Redirect to="/postList" />;
  }

  return (
    <div className="px-5">
      <div className="d-flex ad-item justify-content-between mb-5 border p-sm-5">
        <div className="ad-postedby border text-center">
          <div className="testing">
            <h2>Posted By :</h2>
            <h6>{post.name}</h6>
            <p>{post.phone}</p>
            <p>{post.email}</p>
          </div>
        </div>
        <div className="text-center border px-2 ad-image">
          <img
            className="mw-100 mx-auto d-block my-3"
            id="target-image"
            src={`http://localhost:5000/${post.image}`}
            height="350"
            alt="post-item"
          />
          <h2>{post.title}</h2>
          <h6>{post.location}</h6>
        </div>
      </div>

      <div className="border mb-2 py-sm-3 p-2 px-sm-5">
        <h3>Description</h3>
        <p className="text-justify">{post.description}</p>
      </div>

      <div className="px-auto">
        {post.user === post.requestor ? (
          <button
            onClick={() => {
              deleteAd(post._id);
            }}
            className="btn btn-md btn-danger w-50"
          >
            Delete
          </button>
        ) : (
          <div className="text-right mt-5">
            <a href={`tel:${post.phone}`}>
              <button className="btn btn-lg btn-success mr-2">Call</button>
            </a>
            <a href={`mailto:${post.email}`}>
              <button className="btn btn-lg btn-success">Mail</button>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

PostItem.propTypes = {
  getAdById: PropTypes.func.isRequired,
  deleteAd: PropTypes.func.isRequired,
  ad: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  ad: state.ad
});

export default connect(mapStateToProps, { getAdById, deleteAd })(PostItem);
