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
              <form onSubmit={this.handleSubmit}>
                <p>
                  <label>
                    Name: <input type="text" name="name" value={name} onChange={this.handleChange} />
                  </label>
                </p>
                <p>
                  <label>
                    Email: <input type="email" name="email" value={email} onChange={this.handleChange} />
                  </label>
                </p>
                <p>
                  <label>
                    Message: <textarea name="message" value={message} onChange={this.handleChange} />
                  </label>
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
