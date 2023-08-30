import React, { Component } from "react";

import Layout from "../components/layout";
import Hero from "../components/hero";
import Message from "../components/message";
import SEO from "../components/seo";
import { Heading } from "../components/typography";

import "./animista.css";

const source = "https://docs.google.com/forms/d/e/1FAIpQLSfUA1wmUMO16H34eb7cAWQWrK-15MxDMJuTV-pOft2SSnod1A/viewform?embedded=true";

class ContactPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Layout>
        <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
        <Hero color="#607d8b">
          <div style={{ height: "700px" }}>
            <iframe src={source} style={{ height: "100%", width: "100%" }} frameborder="0">読み込んでいます…</iframe>
          </div>
        </Hero>
      </Layout>
    );
  }
}

export default ContactPage;
