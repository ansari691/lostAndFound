import React from "react";
import { MdEmail, MdPhone, MdFavorite } from "react-icons/md";
import { FaTeamspeak } from "react-icons/fa";

const Footer = ({ darkMode, blackAndWhite }) => {
  return (
    <div
      className="text-center p-2 mt-5"
      style={
        darkMode || blackAndWhite
          ? { backgroundColor: "black", color: "white" }
          : { backgroundColor: "whitesmoke", color: "black" }
      }
    >
      <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
        <FaTeamspeak />
        <span className="ml-3">Contact us</span>
      </div>
      <MdEmail />{" "}
      <a
        href="mailto:ansari691@gmail.com"
        className="mr-3 text-decoration-none text-secondary"
      >
        ansari691@gmail.com
      </a>
      <MdPhone />{" "}
      <a
        href="tel:7276963147"
        className="text-decoration-none text-secondary"
      >
        7276963147
      </a>
      <p>29 Vakil Manzil, Amina Compound, Dhamankar Naka Bhiwandi -421302</p>
      <span>
        Made with <MdFavorite /> by Saif
      </span>
      <p className="mt-3 mb-0">Lost And Found &copy;2020</p>
    </div>
  );
};

export default Footer;
