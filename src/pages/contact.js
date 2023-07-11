import React, { Component } from "react";

import Layout from "../components/layout";
import Hero from "../components/hero";
import Message from "../components/message";
import SEO from "../components/seo";
import { Heading } from "../components/typography";

import "./animista.css";

const encode = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

class ContactPage extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "", email: "", message: "", submitted: false };
  }

  handleSubmit = e => {
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "contact", ...this.state }),
    })
      .then(() => {
        this.setState({ submitted: true });
      })
      .catch(error => alert(error));

    e.preventDefault();
  };

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { name, email, message } = this.state;
    const inputStyle = {
      backgroundColor: "rgba(0,0,0,0.2)",
      color: "#fff",
      borderWidth: "2px",
    };
    return (
      <Layout>
        <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
        <Message className="is-primary">
          <p className="subtitle">
            お急ぎの方は肉声を私に向けてベースバンド伝送するのが確実です。
          </p>
        </Message>
        <Hero color="#607d8b" style={{marginTop: "90px"}}>
          <Heading>お問い合わせ</Heading>
          {this.state.submitted ? (
            <p>内容を送信しました。お問い合わせありがとうございました。</p>
          ) : (
            <form
              name="contact"
              data-netlify="true"
              onSubmit={this.handleSubmit}
            >
              <div className="field">
                <label className="label has-text-white">お名前</label>
                <div className="control">
                  <input
                    style={inputStyle}
                    className="input"
                    type="text"
                    name="name"
                    value={name}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label has-text-white">メールアドレス</label>
                <div className="control">
                  <input
                    style={inputStyle}
                    className="input"
                    type="email"
                    name="email"
                    value={email}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label has-text-white">内容</label>
                <div className="control">
                  <textarea
                    style={inputStyle}
                    className="textarea"
                    name="message"
                    value={message}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button
                    className="button is-dark is-inverted is-outlined"
                    type="submit"
                  >
                    送信
                  </button>
                </div>
              </div>
            </form>
          )}
        </Hero>
      </Layout>
    );
  }
}

export default ContactPage;
