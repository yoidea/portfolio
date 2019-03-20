import React from "react"

import "./timeline.css"

const Hero = ({ className, color, name, children }) => (
  <section id={name} className={`hero is-success is-fullheight ${className}`} style={{
    backgroundColor: color
  }}>
    <div className="hero-body">
      <div className="container">
        {children}
      </div>
    </div>
  </section>
)

export default Hero
