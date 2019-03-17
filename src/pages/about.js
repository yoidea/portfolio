import React, { Component } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import "./animista.css"

class AboutPage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Layout>
        <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
        <section className="hero is-success is-fullheight"
          style={{backgroundColor: "#3f51b5"}}
        >
          <div className="hero-body">
            <div className="container">
              <h1 className="title is-size-2" style={{
                paddingLeft: "0.3em",
                borderLeft: "solid 0.3em #fff"
              }}>
                何者なのか
              </h1>
              <div className="has-text-centered">
                <a className="button is-link is-rounded is-inverted is-outlined jello-horizontal" href="#career">&or;</a>
              </div>
            </div>
          </div>
        </section>
        <section className="hero is-success is-fullheight"
          style={{backgroundColor: "#2196f3"}}
        >
          <div id="career" className="hero-body">
            <div className="container">
              <h1 className="title is-size-2" style={{
                paddingLeft: "0.3em",
                borderLeft: "solid 0.3em #fff"
              }}>
                経歴
              </h1>
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}

export default AboutPage
