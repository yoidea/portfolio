import { Link } from "gatsby";
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
          <div style={{ height: "700px", marginBottom: "1em" }}>
            <iframe src={source} style={{ height: "100%", width: "100%" }} frameborder="0">読み込んでいます…</iframe>
          </div>
          <div className="has-text-centered">
            <Link to="/pgp">
              <a
                className="button is-link is-rounded is-inverted is-outlined"
              >
                PGP公開鍵はこちら
              </a>
            </Link>
          </div>
        </Hero>
      </Layout>
    );
  }
}

export default ContactPage;
