import React, { Component } from "react";

import Layout from "../components/layout";
import Hero from "../components/hero";
import SEO from "../components/seo";
import Message from "../components/message";
import { Heading } from "../components/typography";

class QaPage extends Component {
  render() {
    return (
      <Layout>
        <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
        <Hero color="#607d8b">
          <Message>
            <p className="title">
              <span role="img" aria-label="Sparkles">
                🔗
              </span>
              <a
                className="has-text-link"
                href="https://forms.gle/ufv1eXdwNpm7DHye8"
              >
                アンケートはこちら
              </a>
              <span role="img" aria-label="Sparkles">
                🔗
              </span>
            </p>
          </Message>
          <section className="block">
            <Heading>アンケート</Heading>
            <p>
              年明けからの授業をより良くするためにアンケートへご協力をお願いします。
            </p>
            <ol>
              <li>無記名なので誰が書いたかはわかりません。</li>
              <li>基本的に選択式なのですぐに回答できます。</li>
            </ol>
            <p>
              <a
                className="button is-primary"
                href="https://forms.gle/ufv1eXdwNpm7DHye8"
              >
                アンケートページへ移動する
              </a>
            </p>
          </section>
        </Hero>
      </Layout>
    );
  }
}

export default QaPage;
