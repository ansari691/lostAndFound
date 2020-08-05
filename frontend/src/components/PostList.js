import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import "./PostList.css";
import PostCard from "./PostCard";
import { getAllAds } from "../actions/ad";
import { IoIosMan } from "react-icons/io";
import { MdPhoneIphone } from "react-icons/md";

const PostList = ({ posts, pages, getAllAds, user, darkMode }) => {
  const [currentPage, setCurrentPage] = useState(1);
  let [pagesArray, setPagesArray] = useState([1]);

  useEffect(() => {
    getAllAds(12, currentPage);
  }, [currentPage]);

  pagesArray = [];
  for (let i = 1; i <= pages; i++) {
    pagesArray.push(i);
  }

  const list = posts.map((post) => {
    return (
      <PostCard
        key={post._id}
        darkMode={darkMode}
        title={post.title}
        location={post.location}
        id={post._id}
        image={post.image}
        date={post.date}
      />
    );
  });

  const empty = <div>No posts available currently</div>;

  const categories = [
    "Humans",
    "Phones",
    "Vehicles",
    "Wallets",
    "Pets",
    "Bags",
  ];
  const categoriesIcons = [<IoIosMan />, <MdPhoneIphone />];

  return (
    <div className="text-center">
      <ul className="d-flex flex-wrap list-unstyled border mt-n5 mb-0 p-2 px-xl-5 category-list justify-content-center">
        {categories.map((c) => {
          return <li onClick="">{c}</li>;
        })}
      </ul>
      <h6 className="text-right">Welcome, {user.name}!</h6>
      <div style={{backgroundColor : "#5cc7cd"}}>
        <img
          src={require("../images/blog-banner-lost-and-found_1.png")}
          alt="banner-image"
          width="100%"
          id="banner-image"
        />
      </div>

      <div className="post-list row m-5">{posts.length > 0 ? list : empty}</div>

      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          {currentPage > 1 && (
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => setCurrentPage((currentPage) => currentPage - 1)}
              >
                Previous
              </button>
            </li>
          )}
          {pagesArray.map((page) => (
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            </li>
          ))}
          {currentPage < pages && (
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => setCurrentPage((currentPage) => currentPage + 1)}
              >
                Next
              </button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

PostList.propTypes = {
  loading: PropTypes.bool,
  posts: PropTypes.array.isRequired,
  getAllAds: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  posts: state.ad.posts,
  loading: state.ad.loading,
  user: state.auth.user,
  pages: state.ad.pages,
});

export default connect(mapStateToProps, { getAllAds })(PostList);
