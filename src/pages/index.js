import React, { Component } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import "./animista.css"

class IndexPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isload: true
    }
    setTimeout(() => {
      this.setState({ isload: false })
    }, 1000)
  }

  render() {
    let text = (
      <div>
        <h1 className="title is-size-1 focus-in-contract-bck">
          入江一帆（ラムダ）
        </h1>
        <h2 className="subtitle focus-in-contract-bck-1s">
          学生 / エンジニア志望 / 塾講師
        </h2>
      </div>
    )
    if (this.state.isload) {
      text = (
        <h1 className="title blur-out-expand-fwd"
          style={{fontSize: "20em"}}
        >
          λ
        </h1>
      )
    }
    return (
      <Layout>
        <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
        <section className="hero is-success is-fullheight"
          style={{backgroundColor: "#009688"}}
        >
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
