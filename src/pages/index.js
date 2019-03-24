import React, { Component } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Hero from "../components/hero"
import Message from "../components/message"
import SEO from "../components/seo"
import Confetti from "../components/confetti"

import "./animista.css"

class IndexPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isload: true,
    }
    setTimeout(() => {
      this.setState({ isload: false })
    }, 1000)
  }

  render() {
    let text = (
      <div>
        <h1 className="title is-size-2 text-focus-in">入江一帆（ラムダ）</h1>
        <h2 className="subtitle text-focus-in-1s">
          学生 / エンジニア志望 / 塾講師
        </h2>
        <a
          className="flip-in-hor-bottom-1 button is-success is-rounded is-inverted is-outlined"
          target="_blank"
          href="https://twitter.com/yoidea"
        >
          Twitter
        </a>
        <a
          className="flip-in-hor-bottom-2 button is-success is-rounded is-inverted is-outlined"
          target="_blank"
          href="https://www.nicovideo.jp/user/48313347"
        >
          Niconico
        </a>
        <a
          className="flip-in-hor-bottom-3 button is-success is-rounded is-inverted is-outlined"
          target="_blank"
          href="https://github.com/yoidea"
        >
          Github
        </a>
      </div>
    )
    if (this.state.isload) {
      text = (
        <h1 className="title text-blur-out" style={{ fontSize: "20em" }}>
          λ
        </h1>
      )
    }
    return (
      <Layout>
        <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
        <Confetti />
        <Message className="is-danger">
          <p className="title">🎉進級しました🎉</p>
        </Message>
        <Hero className="color-change-2x">
          <div className="has-text-centered">{text}</div>
        </Hero>
      </Layout>
    )
  }
}

export default IndexPage
