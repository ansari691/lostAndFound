import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";


import "./PostList.css";
import PostCard from "./PostCard";
import { getAllAds } from "../actions/ad";

const PostList = ({ posts, getAllAds, user, darkMode }) => {

  useEffect(() => {
    getAllAds();
  }, []);

  const list = posts.map(post => {
    return (
      <PostCard
        key={post._id}
        darkMode={darkMode}
        title={post.title}
        location={post.location}
        id={post._id}
        image={post.image}
        date = {post.date} 
      />
    );
  });


  const empty = <div>No posts available currently</div>;

return (
  <div className="text-center">
    <h6 className="text-right">Welcome, {user.name}!</h6>
    <div className="post-list row m-5">{posts.length > 0 ? list : empty}</div>
  </div>
  
);
};

PostList.propTypes = {
  loading: PropTypes.bool,
  posts: PropTypes.array.isRequired,
  getAllAds: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  posts: state.ad.posts,
  loading: state.ad.loading,
  user : state.auth.user
});

export default connect(mapStateToProps, { getAllAds })(PostList);
