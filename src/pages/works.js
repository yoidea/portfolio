import React, { Component } from "react";
import "loaders.css";

import Layout from "../components/layout";
import Hero from "../components/hero";
import SEO from "../components/seo";
import { Heading } from "../components/typography";

import "./animista.css";
import smat from "../images/smat_thumbnail.png";

class WorksPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appStarting: false,
      message: "",
      loader: "",
    };
  }

  handleClick = async () => {
    this.setState({
      appStarting: true,
    });
    this.setState({
      message: (
        <div>
          <span className="has-text-weight-bold">APIサーバー</span>
          を叩き起こしています
        </div>
      ),
      loader: (
        <div className="loader-inline ball-pulse-sync">
          <div />
          <div />
          <div />
        </div>
      ),
    });
    const apiStatus = await fetch(
      "https://smat-api-dev.herokuapp.com/v1/teachers/1/exams"
    ).then(response => response.ok);
    this.setState({
      message: (
        <div>
          <span className="has-text-weight-bold">Webサーバー</span>
          が心の準備をしています
        </div>
      ),
      loader: (
        <div className="loader-inline line-scale">
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>
      ),
    });
    const pageStatus = await fetch("https://smat-dev.herokuapp.com").then(
      response => response.ok
    );
    window.open("https://smat-dev.herokuapp.com");
    this.setState({
      appStarting: false,
      message: "",
      loader: "",
    });
  };

  render() {
    return (
      <Layout>
        <SEO title="Works" keywords={[`gatsby`, `application`, `react`]} />
        <Hero color="#e91e63">
          <Heading>作ったもの</Heading>
          <div class="columns is-desktop">
            <div class="column is-4">
              <figure class="image is-4by3">
                <img src={smat} alt="Smart Teach" />
              </figure>
            </div>
            <div class="column">
              <h1 className="title">Smart Teach</h1>
              <p>
                小テストの作成から出題、採点、分析までをサポートするアプリケーション
              </p>
              <p>チーム開発で主にフロントエンドを担当した。</p>
              <div class="tags are-medium">
                <span class="tag is-dark">React</span>
                <span class="tag is-dark">Rails</span>
                <span class="tag is-dark">Heroku</span>
              </div>
              <p>
                <button
                  className="button is-danger is-inverted is-outlined"
                  disabled={this.state.appStarting ? true : false}
                  onClick={this.handleClick}
                >
                  {this.state.appStarting ? "起動中..." : "アプリを起動する"}
                </button>
                <div className="has-text-centered" style={{ padding: "1.5em" }}>
                  {this.state.loader}
                  <p>{this.state.message}</p>
                </div>
              </p>
            </div>
          </div>
        </Hero>
      </Layout>
    );
  }
}

export default WorksPage;
