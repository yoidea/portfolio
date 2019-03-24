import React from "react";
import PropTypes from "prop-types";

import "./timeline.css";

const Timeline = ({ date, sub, children }) => (
  <div>
    <div class="columns">
      <div class="column is-2">
        <div class="timeline-date is-hidden-touch">
          <p>{date}</p>
        </div>
      </div>
      <div class="column">
        <div class="timeline-content">
          <p class="sub">{sub}</p>
          <p class="main">{children}</p>
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
