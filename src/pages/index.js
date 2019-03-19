import React, { Component } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Confetti from "../components/confetti"

import "./animista.css"

class IndexPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isload: true,
      message: true
    }
    setTimeout(() => {
      this.setState({ isload: false })
    }, 1000)
    // confetti settings
    const DURATION = 20000
    const LENGTH = 200
    new Confetti({
      width    : window.innerWidth,
      height   : window.innerHeight,
      length   : LENGTH,
      duration : DURATION
    })
    setTimeout(() => {
      new Confetti({
        width    : window.innerWidth,
        height   : window.innerHeight,
        length   : LENGTH,
        duration : DURATION
      })
    }, DURATION / 2)
  }

  render() {
    let text = (
      <div>
        <h1 className="title is-size-2 text-focus-in">入江一帆（ラムダ）</h1>
        <h2 className="subtitle text-focus-in-1s">
          学生 / エンジニア志望 / 塾講師
        </h2>
        <a className="flip-in-hor-bottom-1 button is-success is-rounded is-inverted is-outlined"
          target="_blank" href="https://twitter.com/yoidea"
        >Twitter</a>
        <a className="flip-in-hor-bottom-2 button is-success is-rounded is-inverted is-outlined"
          target="_blank" href="https://www.nicovideo.jp/user/48313347"
        >Niconico</a>
        <a className="flip-in-hor-bottom-3 button is-success is-rounded is-inverted is-outlined"
          target="_blank" href="https://github.com/yoidea"
        >Github</a>
      </div>
    )
    if (this.state.isload) {
      text = (
        <h1 className="title text-blur-out" style={{ fontSize: "20em" }}>
          λ
        </h1>
      )
    }
    let message = (
      <div className="container" style={{
        position: "fixed",
        top: "3rem",
        left: "0",
        right: "0",
        padding: "1rem"
      }}>
        <div className="notification has-text-centered is-danger">
          <button className="delete" onClick={() => {this.setState({ message: false })}}></button>
          <p className="title">🎉進級しました🎉</p>
        </div>
      </div>
    )
    if (!this.state.message) {
      message = ""
    }
    return (
      <Layout>
        <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
        {message}
        <section className="hero is-success is-fullheight color-change-2x">
          <div className="hero-body">
            <div className="container has-text-centered">
              {text}
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}

export default IndexPage
