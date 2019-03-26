import React, { Component } from "react";

import Layout from "../components/layout";
import Hero from "../components/hero";
import SEO from "../components/seo";
import { Heading } from "../components/typography";

import "./animista.css";

class VideosPage extends Component {
  render() {
    return (
      <Layout>
        <SEO title="Movies" keywords={[`gatsby`, `application`, `react`]} />
        <Hero color="#ff9800">
          <Heading>動画</Heading>
          <div class="columns is-desktop">
            <div class="column">
              <h1 className="title">クソダサいスライドを作ろう</h1>
            </div>
            <div class="column">
              <h1 className="title">ワンクリック詐欺を作ろう</h1>
            </div>
            <div class="column">
              <h1 className="title">うるさい音声を作ろう</h1>
            </div>
          </div>
        </Hero>
      </Layout>
    );
  }
}

export default VideosPage;
