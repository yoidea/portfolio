import React, { Component } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Timeline from "../components/timeline"

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
                <a className="button is-link is-rounded is-inverted is-outlined jello-horizontal" href="#academicbg">&or;</a>
              </div>
            </div>
          </div>
        </section>
        <section className="hero is-success is-fullheight"
          style={{backgroundColor: "#2196f3"}}
        >
          <div id="academicbg" className="hero-body">
            <div className="container">
              <h1 className="title is-size-2" style={{
                paddingLeft: "0.3em",
                borderLeft: "solid 0.3em #fff"
              }}>
                学歴
              </h1>
              <Timeline date="2010" sub="在上海日本国総領事館付属">
                <a target="_blank" href="http://www.srx2.net.cn/">上海日本人学校</a> 虹橋校
              </Timeline>
              <Timeline date="2013" sub="神戸市立">
                <a target="_blank" href="http://www2.kobe-c.ed.jp/osb-ms/">押部谷中学校</a>
              </Timeline>
              <Timeline date="2018" sub="神戸市立">
                <a target="_blank" href="http://www.kobe-kosen.ac.jp/">工業高等専門学校</a> 電子工学科
              </Timeline>
              <Timeline date="2020" sub="国立">
                <a target="_blank" href="http://www.shinshu-u.ac.jp/">信州大学</a> 工学部 電子情報システム工学科
              </Timeline>
              <div className="has-text-centered">
                <a className="button is-info is-rounded is-inverted is-outlined jello-horizontal" href="#career">&or;</a>
              </div>
            </div>
          </div>
        </section>
        <section className="hero is-success is-fullheight"
          style={{backgroundColor: "#00bcd4"}}
        >
          <div id="career" className="hero-body">
            <div className="container">
              <h1 className="title is-size-2" style={{
                paddingLeft: "0.3em",
                borderLeft: "solid 0.3em #fff"
              }}>
                職歴
              </h1>
              <Timeline date="2016" sub="株式会社創造学園">
                エディック個別西神校
              </Timeline>
              <Timeline date="2016" sub="ニッセイコム株式会社">
                公共事業部 インターンシップ
              </Timeline>
              <Timeline date="2018" sub="アイキューブ株式会社">
                いずみ塾 大豆島校
              </Timeline>
              <Timeline date="2018" sub="クックパッド株式会社">
                10 Day Tech インターンシップ
              </Timeline>
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}

export default AboutPage
