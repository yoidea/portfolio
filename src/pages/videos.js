import React, { Component } from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import Hero from "../components/hero";
import SEO from "../components/seo";
import { Heading } from "../components/typography";
import {
  getDelayCertificateMock,
  getMockQuerySuffix,
} from "../lib/delay-certificate-mocks";

import "./animista.css";

const API_PATH = "/.netlify/functions/delay-certificates";

class VideosPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      certificates: [],
      latest: null,
      loadingCertificates: true,
      certificateError: null,
      mockMode: null,
    };
  }

  componentDidMount() {
    const params = new URLSearchParams(window.location.search);
    const mockMode = params.get("mock");
    const mock = getDelayCertificateMock(mockMode);

    if (mock) {
      this.setState({
        certificates: mock.certificates,
        latest: mock.latest,
        loadingCertificates: false,
        certificateError: null,
        mockMode,
      });
      return;
    }

    fetch(API_PATH)
      .then(response => {
        const contentType = response.headers.get("content-type") || "";

        if (!contentType.includes("application/json")) {
          throw new Error(
            "ローカル確認では ?mock=delayed または ?mock=published を付けると遅延証明書の表示を確認できます。"
          );
        }

        return response.json().then(data => {
          if (!response.ok) {
            throw new Error(
              data && data.error
                ? `遅延証明書を取得できませんでした: ${data.error}`
                : "遅延証明書を取得できませんでした。"
            );
          }
          return data;
        });
      })
      .then(data => {
        this.setState({
          certificates: data.certificates || [],
          latest: data.latest,
          loadingCertificates: false,
          certificateError: null,
        });
      })
      .catch(error => {
        this.setState({
          certificates: [],
          latest: null,
          loadingCertificates: false,
          certificateError: error.message,
        });
      });
  }

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
          <style>{delaySectionStyles}</style>
          <Heading>遅延証明書</Heading>
          <section className="delay-info-box">
            <div className="delay-info-heading">
              <p className="delay-info-label">掲載内容について</p>
              <p>
                ラムダ技術部のYouTube動画投稿が毎週土曜日18時の予定時刻より10分以上遅れた場合に、
                電子版の遅延証明書を掲載します。
              </p>
            </div>
            <div className="delay-info-grid">
              <div>
                <span>掲載対象</span>
                <p>毎週土曜日18時を基準としたYouTube動画投稿の遅延</p>
              </div>
              <div>
                <span>更新</span>
                <p>YouTubeの最新投稿状況をもとに自動計算し、投稿確認まで随時更新</p>
              </div>
              <div>
                <span>掲載内容</span>
                <p>予定投稿日時、公開日時、対象動画、確定した遅延時間</p>
              </div>
              <div>
                <span>保存方法</span>
                <p>証明書を開き、ブラウザの印刷機能からPDFとして保存</p>
              </div>
            </div>
          </section>
          {this.renderDelayStatus()}
          {this.renderCertificates()}
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

  renderDelayStatus() {
    const { latest, mockMode } = this.state;

    if (!latest) {
      return null;
    }

    return (
      <div className="notification is-dark">
        {mockMode ? <p>開発用モック: {mockMode}</p> : null}
        <p>
          最新確認: {formatDateTime(latest.checkedAt)} / 状態:{" "}
          {statusLabel(latest.status)}
        </p>
        {latest.status === "delayed" ? (
          <p>
            現在の遅延時間: {formatMinutes(getEffectiveDelayMinutes(latest))}
          </p>
        ) : null}
      </div>
    );
  }

  renderCertificates() {
    const {
      certificates,
      loadingCertificates,
      certificateError,
      mockMode,
    } = this.state;

    if (loadingCertificates) {
      return <p>遅延証明書を読み込んでいます。</p>;
    }

    if (certificateError) {
      return (
        <div className="notification is-warning">
          <p>{certificateError}</p>
          <p>Netlify Functions の初回実行後に一覧が表示されます。</p>
        </div>
      );
    }

    if (!certificates.length) {
      return (
        <div className="notification is-info">
          現在、発行済みの遅延証明書はありません。
        </div>
      );
    }

    return (
      <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th>予定日時</th>
            <th>対象動画</th>
            <th>遅れ</th>
            <th>証明書</th>
          </tr>
        </thead>
        <tbody>
          {certificates.map(certificate => (
            <tr key={certificate.id}>
              <td>{formatDateTime(certificate.scheduledAt)}</td>
              <td>
                {certificate.videoUrl ? (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={certificate.videoUrl}
                  >
                    {certificate.videoTitle}
                  </a>
                ) : (
                  statusLabel(certificate.status)
                )}
              </td>
              <td>{formatMinutes(getEffectiveDelayMinutes(certificate))}</td>
              <td>
                <Link
                  className="button is-primary"
                  to={`/delay-certificate?id=${encodeURIComponent(
                    certificate.id
                  )}${getMockQuerySuffix(mockMode)}`}
                >
                  表示
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

const delaySectionStyles = `
#delay .delay-info-box {
  background: rgba(255, 255, 255, 0.95);
  border-left: 6px solid #ffca28;
  border-radius: 6px;
  box-shadow: 0 0.75rem 2rem rgba(0, 0, 0, 0.18);
  color: #263238;
  margin: 1.5rem 0 2rem;
  padding: 1.5rem;
}
#delay .delay-info-heading {
  border-bottom: 1px solid #cfd8dc;
  margin-bottom: 1.25rem;
  padding-bottom: 1rem;
}
#delay .delay-info-label {
  color: #263238;
  font-size: 1.15rem;
  font-weight: bold;
  margin-bottom: 0.35rem;
}
#delay .delay-info-heading p:last-child {
  line-height: 1.8;
  margin-bottom: 0;
}
#delay .delay-info-grid {
  display: grid;
  gap: 0.85rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
#delay .delay-info-grid > div {
  background: #eceff1;
  border: 1px solid #cfd8dc;
  border-radius: 4px;
  min-height: 6.25rem;
  padding: 1rem;
}
#delay .delay-info-grid span {
  color: #455a64;
  display: block;
  font-size: 0.86rem;
  font-weight: bold;
  margin-bottom: 0.45rem;
}
#delay .delay-info-grid p {
  line-height: 1.65;
  margin: 0;
}
@media screen and (max-width: 560px) {
  #delay .delay-info-box {
    padding: 1.1rem;
  }
  #delay .delay-info-grid {
    grid-template-columns: 1fr;
  }
  #delay .delay-info-grid > div {
    min-height: auto;
  }
}
`;

function formatDateTime(value) {
  if (!value) {
    return "";
  }

  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Tokyo",
  }).format(new Date(value));
}

function formatMinutes(minutes) {
  const safeMinutes = Number(minutes) || 0;
  const days = Math.floor(safeMinutes / 1440);
  const hours = Math.floor((safeMinutes % 1440) / 60);
  const restMinutes = safeMinutes % 60;

  if (days > 0) {
    return `${days}日 ${hours}時間 ${restMinutes}分`;
  }

  if (hours > 0) {
    return `${hours}時間 ${restMinutes}分`;
  }

  return `${safeMinutes}分`;
}

function getEffectiveDelayMinutes(certificate) {
  if (
    certificate &&
    certificate.status === "delayed" &&
    certificate.scheduledAt
  ) {
    return Math.max(
      0,
      Math.floor(
        (Date.now() - new Date(certificate.scheduledAt).getTime()) / 60000
      )
    );
  }

  return certificate ? certificate.delayMinutes : 0;
}

function statusLabel(status) {
  switch (status) {
    case "delayed":
      return "遅延中";
    case "published":
      return "公開済み";
    case "no-delay":
      return "遅延なし";
    case "pending":
      return "確認中";
    default:
      return status || "";
  }
}

export default VideosPage;
