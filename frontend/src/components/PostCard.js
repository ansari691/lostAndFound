import React from "react";
import "./PostCard.css";
import { Link } from "react-router-dom";

const PostCard = ({ title, location, image, id, date, darkMode }) => {
  const dateString = date.slice(0, 19),
    postDate = new Date(dateString),
    month = postDate.getMonth(),
    dateNum = postDate.getDate(),
    hours = postDate.getHours(),
    minutes = postDate.getMinutes();

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
    <div className="post-card">
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
      <div className="border p-3 ml-lg-5 mr-sm-2 mb-5">
        <div>
          <div className="text-center">
            <img
              className="mw-100 mx-auto border rounded p-2"
              src={`http://localhost:5000/${image}`}
              alt="post-dp"
              width="200"
              height="150"
            />
          </div>
          <div className="my-auto">
            <h2>{title}</h2>
            <p className="mb-3">{location}</p>
            <h6>
              {postDate.toString().slice(0, 10) ==
              currentDate.toString().slice(0, 10)
                ? "TODAY"
                : months[month] + " " + dateNum}
            </h6>
          </div>
        </div>
      </div>
    </Link>
    </div>
    
  );
};

export default PostCard;
