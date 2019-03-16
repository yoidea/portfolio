import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <section className="hero is-success is-fullheight">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">
            入江一帆（ラムダ）
          </h1>
          <h2 className="subtitle">
            学生 / エンジニア志望 / 塾講師
          </h2>
        </div>
      </div>
    </section>
  </Layout>
)

export default IndexPage
