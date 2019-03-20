import React, { Component } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import "./animista.css"

const encode = (data) => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")
}

class ContactPage extends Component {
  constructor(props) {
    super(props)
    this.state = { name: "", email: "", message: "" }
  }

  handleSubmit = e => {
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "contact", ...this.state })
    })
      .then(() => alert("Success!"))
      .catch(error => alert(error))

    e.preventDefault()
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { name, email, message } = this.state
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
              <form name="contact" data-netlify="true" onSubmit={this.handleSubmit}>
                <div className="field">
                  <label className="label">Name</label>
                  <div className="control">
                    <input className="input" type="text" name="name" value={name} onChange={this.handleChange} />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Email</label>
                  <div className="control">
                    <input className="input" type="email" name="email" value={email} onChange={this.handleChange} />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Message</label>
                  <div className="control">
                    <textarea className="textarea" name="message" value={message} onChange={this.handleChange} />
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <button className="button" type="submit">Send</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}

export default ContactPage
