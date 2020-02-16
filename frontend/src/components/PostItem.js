import React, { useEffect, Fragment } from "react";
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

      <div className="text-right">
        {post.user === post.requestor ? (
          // <button
          //   onClick={() => {
          //     deleteAd(post._id);
          //   }}
          //   className="btn btn-md btn-danger"
          // >
          //   Delete
          // </button>
          <Fragment>
            <button type="button" className="btn btn-log btn-danger" data-toggle="modal" data-target="#staticBackdrop">
              Delete
</button>

            <div class="modal fade" id="staticBackdrop" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body text-danger text-center">
                    Beware! The change is irreversable, your post would be deleted permanently
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" onClick={() => { deleteAd(post._id) }} class="btn btn-danger">Confirm Delete</button>
                  </div>
                </div>
              </div>
            </div>
          </Fragment>

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
