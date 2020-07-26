import React, { Component } from "react";

import Layout from "../components/layout";
import Hero from "../components/hero";
import SEO from "../components/seo";
import { Heading } from "../components/typography";

import "./animista.css";
import thumbnail1 from "../images/yt_thumbnail1.png";
import thumbnail2 from "../images/yt_thumbnail2.png";
import thumbnail3 from "../images/yt_thumbnail3.png";

class VideosPage extends Component {
  render() {
    return (
      <Layout>
        <SEO title="Movies" keywords={[`gatsby`, `application`, `react`]} />
        <Hero color="#ff9800">
          <Heading>動画</Heading>
          <p>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.youtube.com/channel/UC8g17oXkRt8buwQL8GU-NSw"
            >
              ラムダ技術部 / Yoidea
            </a>
            というチャンネルで技術系の真面目な動画や不真面目な動画を投稿しています。
          </p>
          <p>不真面目な動画の方が伸びるので多めかもしれません。</p>
          <p>
            プログラミングや電子工学、数学などに興味を持つきっかけになれると嬉しいです。
          </p>
          <div class="columns is-desktop">
            <div class="column">
              <h1 className="title">【騙されないで】画面の捏造ちょろ過ぎて草</h1>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.youtube.com/watch?v=GXZZB5vO78c"
              >
                <figure class="image is-16by9">
                  <img src={thumbnail1} alt="Smart Teach" />
                </figure>
               </a>
            </div>
            <div class="column">
              <h1 className="title">【決定版】オンライン授業をサボる方法</h1>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.youtube.com/watch?v=YM12QR1m1O8"
              >
                <figure class="image is-16by9">
                  <img src={thumbnail2} alt="Smart Teach" />
                </figure>
              </a>
            </div>
            <div class="column">
              <h1 className="title">【理系】超精密なフレンチトーストを作ろう</h1>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.youtube.com/watch?v=G476yr41Jfw"
              >
                <figure class="image is-16by9">
                  <img src={thumbnail3} alt="Smart Teach" />
                </figure>
              </a>
            </div>
          </div>
        </Hero>
      </Layout>
    );
  }
}

export default VideosPage;
