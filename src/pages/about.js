import React, { Component } from "react";

import Layout from "../components/layout";
import Hero from "../components/hero";
import SEO from "../components/seo";
import Timeline from "../components/timeline";
import { Heading } from "../components/typography";

import "./animista.css";

class AboutPage extends Component {
  render() {
    return (
      <Layout>
        <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
        <Hero color="#3f51b5" name="about">
          <Heading>何者なのか</Heading>
          <p className="subtitle">
            ソフトウェアエンジニアとして働いています。音楽、映像、webページ、何でも作ります。
          </p>
          <p className="subtitle">
            コードを書いたり
            <span role="img" aria-label="Laptop">
              💻
            </span>
            、弾いたり
            <span role="img" aria-label="Guitar">
              🎸
            </span>
            するのが好きです。
          </p>
          <div className="has-text-centered">
            <a
              className="button is-link is-rounded is-inverted is-outlined jello-horizontal"
              href="#academicbg"
            >
              &or;
            </a>
          </div>
        </Hero>
        <Hero color="#2196f3" name="academicbg">
          <Heading>学歴</Heading>
          <Timeline date="2010" sub="在上海日本国総領事館付属">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="http://www.srx2.net.cn/"
            >
              上海日本人学校
            </a>{" "}
            虹橋校
          </Timeline>
          <Timeline date="2013" sub="神戸市立">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="http://www2.kobe-c.ed.jp/osb-ms/"
            >
              押部谷中学校
            </a>
          </Timeline>
          <Timeline date="2018" sub="神戸市立">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="http://www.kobe-kosen.ac.jp/"
            >
              工業高等専門学校
            </a>{" "}
            電子工学科
          </Timeline>
          <Timeline date="2020" sub="国立">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="http://www.shinshu-u.ac.jp/"
            >
              信州大学
            </a>{" "}
            工学部 電子情報システム工学科
          </Timeline>
          <div className="has-text-centered">
            <a
              className="button is-info is-rounded is-inverted is-outlined jello-horizontal"
              href="#career"
            >
              &or;
            </a>
          </div>
        </Hero>
        <Hero color="#00bcd4" name="career">
          <Heading>職歴</Heading>
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
          <Timeline date="2020" sub="ヤフー株式会社">
            サービス統括本部 ID/PIM本部 開発1部
          </Timeline>
          <div className="has-text-centered">
            <a
              className="button is-link is-rounded is-inverted is-outlined jello-horizontal"
              href="#about"
            >
              &and;
            </a>
          </div>
        </Hero>
      </Layout>
    );
  }
}

export default AboutPage;
