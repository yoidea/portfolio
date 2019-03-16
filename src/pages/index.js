import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import "./animista.css"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <section className="hero is-success is-fullheight"
      style={{backgroundColor: "#009688"}}
    >
      <div className="hero-body">
        <div className="container has-text-centered">
          <h1 className="title is-size-1 focus-in-contract-bck">
            入江一帆（ラムダ）
          </h1>
          <h2 className="subtitle focus-in-contract-bck-1s">
            学生 / エンジニア志望 / 塾講師
          </h2>
        </div>
      </div>
    </section>
  </Layout>
)

export default IndexPage
