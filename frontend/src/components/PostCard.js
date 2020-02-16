import React from "react";
import "./PostCard.css";
import { Link } from "react-router-dom";

const PostCard = ({ title, location, image, id, date, darkMode }) => {
  const dateString = date.slice(0, 19),
    postDate = new Date(dateString),
    month = postDate.getMonth(),
    dateNum = postDate.getDate();

  const currentDate = new Date();

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];

  return (
    <div className="post-card col-sm-6 col-md-4 col-lg-3  mb-3">
      <Link
        to={{
          pathname: "/postItem",
          state: {
            id: id
          }
        }}
        className={
          darkMode
            ? "text-decoration-none text-light"
            : "text-decoration-none text-dark"
        }
      //style={{textDecoration : 'none'}}
      >
        <div className="border p-2">
          <img
            className="mw-100 rounded"
            src={`http://localhost:5000/${image}`}
            alt="post-dp"
            height="150"
          />
          <div className="text-left">
            <h2>{title}</h2>
            <p className="mb-3">{location}</p>
            <h6><small class="text-muted">
              {postDate.toString().slice(0, 10) ==
                currentDate.toString().slice(0, 10)
                ? "TODAY"
                : months[month] + " " + dateNum}</small>
            </h6>
          </div>
        </div>
      </Link>
    </div>

  );
};

export default PostCard;
