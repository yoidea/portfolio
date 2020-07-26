import React, { Component } from "react";

import Layout from "../components/layout";
import Hero from "../components/hero";
import SEO from "../components/seo";
import { Heading } from "../components/typography";

import "./animista.css";
import thumbnail1 from "../images/yt_thumbnail1.png";
import thumbnail2 from "../images/yt_thumbnail2.png";
import thumbnail3 from "../images/yt_thumbnail3.png";

const encode = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

class VideosPage extends Component {
  constructor(props) {
    super(props);
    this.state = { message: "", submitted: false };
  }

  handleSubmit = e => {
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "request", ...this.state }),
    })
      .then(() => {
        this.setState({ submitted: true });
      })
      .catch(error => alert(error));

    e.preventDefault();
  };

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { message } = this.state;
    const inputStyle = {
      backgroundColor: "rgba(0,0,0,0.2)",
      color: "#fff",
      borderWidth: "2px",
    };
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
              <h1 className="title">
                【騙されないで】画面の捏造ちょろ過ぎて草
              </h1>
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
              <h1 className="title">
                【理系】超精密なフレンチトーストを作ろう
              </h1>
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
        <Hero color="#e91e63">
          <Heading>リクエスト</Heading>
          <p>やってほしい題材や面白そうな題材があれば是非教えて下さい。</p>
          <p>
            リクエストが採用される可能性は低いかもしれませんが全て目を通しています。
          </p>
          {false ? (
            <p>内容を送信しました。リクエストありがとうございます。</p>
          ) : (
            <form
              name="request"
              data-netlify="true"
              onSubmit={this.handleSubmit}
            >
              <div className="field">
                <label className="label has-text-white">内容</label>
                <div className="control">
                  <textarea
                    style={inputStyle}
                    className="textarea"
                    name="message"
                    value={message}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button
                    className="button is-dark is-inverted is-outlined"
                    type="submit"
                  >
                    送信
                  </button>
                </div>
              </div>
            </form>
          )}
        </Hero>
      </Layout>
    );
  }
}

export default VideosPage;
