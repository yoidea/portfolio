import React, { Component } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Hero from "../components/hero"
import SEO from "../components/seo"
import { Heading } from "../components/typography"

import "./animista.css"

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
        </Hero>
      </Layout>
    )
  }
}

export default WorksPage
