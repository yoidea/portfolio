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
          <Heading>遅延証明書</Heading>
          <p>
            ラムダ技術部では毎週土曜日18時に投稿予定の動画が10分以上遅れた場合、遅延証明書を掲載いたします。
            <br />
            遅延の証明が必要な際にダウンロードしてお使いください。
          </p>
          {this.renderCurrentDelayStatus()}
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

  renderCurrentDelayStatus() {
    const { latest, loadingCertificates, certificateError, mockMode } =
      this.state;

    const isDelayed = latest && latest.status === "delayed";
    const currentStatus = latest
      ? isDelayed
        ? formatDelayStatus(getEffectiveDelayMinutes(latest))
        : "遅延なし"
      : loadingCertificates
      ? "確認中"
      : certificateError
      ? "取得できません"
      : "確認中";

    return (
      <section>
        <h2 className="subtitle is-5">現在の遅延状況</h2>
        {mockMode ? <p>開発用モック: {mockMode}</p> : null}
        <table className="table is-bordered is-narrow is-fullwidth">
          <thead>
            <tr>
              <th>投稿予定日時</th>
              <th>現在の状況</th>
              <th>最終確認</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{latest ? formatDateTime(latest.scheduledAt) : "-"}</td>
              <td>{currentStatus}</td>
              <td>{latest ? formatDateTime(latest.checkedAt) : "-"}</td>
            </tr>
          </tbody>
        </table>
      </section>
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

function formatDelayStatus(minutes) {
  return `${formatMinutes(minutes)}遅れ`;
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
