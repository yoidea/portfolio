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

export const CodeBlock = ({ children }) => (
  <div className="columns is-mobile is-centered">
    <pre
      className="has-text-left is-size-3-fullhd is-size-4-desktop is-size-6"
      style={{
        color: "white",
        background: "linear-gradient(135deg,#ff1744,#ff9100,#76ff03,#009944,#1de9b6,#3d5afe,#d500f9)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        border: "2px solid",
        borderImage: "linear-gradient(135deg,#ff1744,#ff9100,#76ff03,#009944,#1de9b6,#3d5afe,#d500f9)",
        borderImageSlice: "1",
        borderRadius: "1em",
        marginTop: "1em"
      }}
    >
      {children}
    </pre>
  </div>
);
