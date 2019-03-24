import React, { Component } from "react";

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: true,
    };
  }

  render() {
    return this.state.display ? (
      <div
        className="container"
        style={{
          position: "fixed",
          top: "3rem",
          left: "0",
          right: "0",
          padding: "1rem",
        }}
      >
        <div
          className={`notification has-text-centered ${this.props.className}`}
        >
          <button
            className="delete"
            onClick={() => {
              this.setState({ display: false });
            }}
          />
          {this.props.children}
        </div>
      </div>
    ) : (
      ""
    );
  }
}

export default Message;
