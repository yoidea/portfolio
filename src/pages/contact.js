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
        <Hero color="#607d8b">
          <Heading>お問い合わせ</Heading>
          <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSfUA1wmUMO16H34eb7cAWQWrK-15MxDMJuTV-pOft2SSnod1A/viewform?embedded=true" width="640" height="1237" frameborder="0" marginheight="0" marginwidth="0">読み込んでいます…</iframe>
        </Hero>
      </Layout>
    );
  }
}

export default ContactPage;
