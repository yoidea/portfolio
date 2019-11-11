import { Link } from "gatsby";
import React from "react";

const Footer = () => (
  <footer>
    <div
      className="tabs is-medium is-hidden-desktop"
      style={{
        position: "fixed",
        bottom: "0",
        left: "0",
        right: "0",
        overflow: "scroll",
        backgroundColor: "rgba(0,0,0,0.3)",
      }}
    >
      <ul
        style={{
          border: "none",
        }}
      >
        <li>
          <Link
            className="has-text-white"
            to="/"
            style={{
              borderRight: "solid thin #fff",
            }}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            className="has-text-white"
            to="/about"
            style={{
              borderRight: "solid thin #fff",
            }}
          >
            About
          </Link>
        </li>
        <li>
          <Link
            className="has-text-white"
            to="/works"
            style={{
              borderRight: "solid thin #fff",
            }}
          >
            Works
          </Link>
        </li>
        <li>
          <Link
            className="has-text-white"
            to="/face"
            style={{
              borderRight: "solid thin #fff",
            }}
          >
            Face
          </Link>
        </li>
        <li>
          <Link
            className="has-text-white"
            to="/contact"
            style={{
              borderRight: "solid thin #fff",
            }}
          >
            Contact
          </Link>
        </li>
      </ul>
    </div>
  </footer>
);

export default Footer;
