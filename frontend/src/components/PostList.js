import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";


import "./PostList.css";
import PostCard from "./PostCard";
import { getAllAds } from "../actions/ad";
import axios from "axios";

const PostList = ({ posts, getAllAds, user, darkMode }) => {

  let pages = 0;

  const [ pageNums, setPageNums ] = useState([]);

  useEffect(() => {
    getAllAds();
  }, []);

  useEffect(() => {
    const loadPages = async () => {
    const res = await axios.get("http://localhost:5000/api/postAd/pageCount");
    pages = res.data + 50;

    for(let i=1; i<=pages; i++){
      pageNums.push(i)
      setPageNums(pageNums);
    }
    console.log(pageNums);
    }
    
    loadPages();
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

    <nav aria-label="Page navigation example">
  <ul className="pagination">
    <li className="page-item"><a className="page-link" href="#">Previous</a></li>
    
    {pageNums.map(pageNum => {
      return (
        <li className="page-item"><a className="page-link" href="#">{pageNum}</a></li>
      )
    })}
    {/* <li className="page-item"><a className="page-link" href="#">2</a></li>
    <li className="page-item"><a className="page-link" href="#">3</a></li> */}
    <li className="page-item"><a className="page-link" href="#">Next</a></li>
  </ul>
</nav>
    
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
