import React from "react";

export const Heading = ({ children }) => (
  <h1
    className="title is-size-2"
    style={{
      paddingLeft: "0.3em",
      borderLeft: "solid 0.3em #fff",
    }}
  >
    {children}
  </h1>
);
