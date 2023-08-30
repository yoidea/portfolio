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
          <div className="has-text-centered">
            <a
              className="button is-link is-rounded is-inverted is-outlined jello-horizontal"
              href="#delay"
            >
              &or;
            </a>
          </div>
        </Hero>
        <Hero color="#546e7a" name="delay">
          <Heading>遅延証明書</Heading>
          <p>ラムダ技術部では毎週土曜日18時に投稿予定の動画が10分以上遅れた場合、遅延証明書を掲載いたします。</p>
          <p>遅延の証明が必要な際にダウンロードしてお使いください。</p>
          <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
            <thead>
              <tr>
                <th>日時</th>
                <th>タイトル</th>
                <th>遅れ</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2022年11月8日</td>
                <td><a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://youtu.be/XCMAEwvU3J8"
                  >
                    【ケチ】いつでもできるJRの限界節約方法100選
                  </a>
                </td>
                <td>
                  <a 
                    className="button is-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="/certificate/certificate_of_delay_2022-11-08.pdf"
                  >
                    13455分
                  </a>
                </td>
              </tr>
              <tr>
                <td>2022年8月20日</td>
                <td><a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.youtube.com/shorts/cyPCHMy15SI"
                  >
                    仕事を押し付け合うスマートスピーカーを作った
                  </a>
                </td>
                <td>
                  <a 
                    className="button is-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="/certificate/certificate_of_delay_2022-08-20.pdf"
                  >
                    225分
                  </a>
                </td>
              </tr>
              <tr>
                <td>2022年8月13日</td>
                <td><a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://youtu.be/DXSQ_hkZyW8"
                  >
                    【特定厨】花火の動画から居場所を特定するのちょろすぎて草
                  </a>
                </td>
                <td>
                  <a 
                    className="button is-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="/certificate/certificate_of_delay_2022-08-13.pdf"
                  >
                    210分
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
          <p>※ 遅延証明書が掲載されるまで時間を要する場合があります。</p>
          <p>※ 18時投稿はベストエフォートです。</p>
          <div className="has-text-centered">
            <a
              className="button is-link is-rounded is-inverted is-outlined jello-horizontal"
              href="#request"
            >
              &or;
            </a>
          </div>
        </Hero>
      </Layout>
    );
  }
}

export default VideosPage;
