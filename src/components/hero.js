import React from "react";
import PropTypes from "prop-types";

const Hero = ({ className, color, name, children }) => (
  <section
    id={name}
    className={`hero is-success is-fullheight ${className}`}
    style={{
      backgroundColor: color,
    }}
  >
    <div className="hero-body">
      <div className="container">{children}</div>
    </div>
  </section>
);

Hero.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string,
};

Hero.defaultProps = {
  color: `#607d8b`,
  name: ``,
  className: ``,
};

export default Hero;
