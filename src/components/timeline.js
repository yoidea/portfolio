import React from "react";
import PropTypes from "prop-types";

import "./timeline.css";

const Timeline = ({ date, sub, children }) => (
  <div>
    <div className="columns">
      <div className="column is-2">
        <div className="timeline-date is-hidden-touch">
          <p>{date}</p>
        </div>
      </div>
      <div className="column">
        <div className="timeline-content">
          <p className="sub">{sub}</p>
          <p className="main">{children}</p>
        </div>
      </div>
    </div>
  </div>
);

Timeline.propTypes = {
  children: PropTypes.node.isRequired,
  date: PropTypes.number,
  sub: PropTypes.string,
};

Timeline.defaultProps = {
  date: ``,
  sub: ``,
};

export default Timeline;
