import React, { Component } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import "./animista.css"

class ContactPage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Layout>
        <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
        <section className="hero is-success is-fullheight">
          <div className="hero-body">
            <div className="container">
              <h1 className="title is-size-2" style={{
                paddingLeft: "0.3em",
                borderLeft: "solid 0.3em #fff"
              }}>
                お問い合わせ
              </h1>
              <form name="contact" netlify>
                <p>
                  <label>Name <input type="text" name="name" /></label>
                </p>
                <p>
                  <label>Email <input type="email" name="email" /></label>
                </p>
                <p>
                  <button type="submit">Send</button>
                </p>
              </form>
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}

export default ContactPage
