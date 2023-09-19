import React, { Component } from "react";

import Layout from "../components/layout";
import Hero from "../components/hero";
import SEO from "../components/seo";
import { Heading, CodeBlock } from "../components/typography";

import "./animista.css";

class PgpPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Layout>
        <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
        <Hero color="#263238">
          <Heading>PGP公開鍵</Heading>
          <div className="has-text-centered">
            <p>RSA 4096bit / F693ACBD429FC019C24942C6C01825FBE232C7CB</p>
            <a 
              className="button is-link is-rounded is-inverted is-outlined"
              target="_blank"
              rel="noopener noreferrer"
              href="/pgp/public-key.asc"
            >
              ダウンロード
            </a>
          </div>
          <CodeBlock>
{`-----BEGIN PGP PUBLIC KEY BLOCK-----
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
8aGMXthN7SDEijo=
=MAK4
-----END PGP PUBLIC KEY BLOCK-----`}
          </CodeBlock> 
        </Hero>
      </Layout>
    );
  }
}

export default PgpPage;
