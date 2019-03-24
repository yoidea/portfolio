import React, { Component } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Hero from "../components/hero"
import SEO from "../components/seo"
import { Heading } from "../components/typography"

import "./animista.css"
import smat from "../images/smat_thumbnail.png"

class WorksPage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Layout>
        <SEO title="Works" keywords={[`gatsby`, `application`, `react`]} />
        <Hero color="#e91e63">
          <Heading>作ったもの</Heading>
          <div class="columns is-desktop">
            <div class="column is-4">
              <figure class="image is-4by3">
                <img src={smat} />
              </figure>
            </div>
            <div class="column">
              <h1 className="title">Smart Teach</h1>
              <p>小テストの作成から出題、採点、分析までをサポートするアプリケーション</p>
              <p>チーム開発で主にフロントエンドを担当した。</p>
              <div class="tags are-medium">
                <span class="tag is-dark">React</span>
                <span class="tag is-dark">Rails</span>
                <span class="tag is-dark">Heroku</span>
              </div>
              <p><a target="_blank" href="https://smat-dev.herokuapp.com/" className="button is-danger is-inverted is-outlined">ページを見る</a></p>
            </div>
          </div>
        </Hero>
      </Layout>
    )
  }
}

export default WorksPage
