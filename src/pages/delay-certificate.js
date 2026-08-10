import React, { Component } from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import Hero from "../components/hero";
import SEO from "../components/seo";
import { getMockCertificate } from "../lib/delay-certificate-mocks";
import certificateLogo from "../images/logo.png";

import "./animista.css";

const API_PATH = "/.netlify/functions/delay-certificates";

class DelayCertificatePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      certificate: null,
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const mockMode = params.get("mock");
    const mockCertificate = getMockCertificate(mockMode, id);

    if (mockCertificate) {
      this.setState({
        certificate: mockCertificate,
        loading: false,
        error: null,
      });
      return;
    }

    if (!id) {
      this.setState({
        loading: false,
        error: "証明書IDが指定されていません。",
      });
      return;
    }

    fetch(`${API_PATH}?id=${encodeURIComponent(id)}`)
      .then(response => {
        return response.json().then(data => {
          if (!response.ok) {
            throw new Error(
              data && data.error
                ? `証明書を取得できませんでした: ${data.error}`
                : "証明書を取得できませんでした。"
            );
          }
          return data;
        });
      })
      .then(data => {
        this.setState({
          certificate: data.certificate,
          loading: false,
          error: null,
        });
      })
      .catch(error => {
        this.setState({
          loading: false,
          error: error.message,
        });
      });
  }

  renderCertificate() {
    const { certificate } = this.state;

    if (!certificate) {
      return null;
    }

    const title = certificate.videoTitle || "未公開";
    const delayMinutes = getEffectiveDelayMinutes(certificate);

    return (
      <section className="delay-certificate">
        <div className="certificate-topline">
          <img
            className="certificate-logo"
            src={certificateLogo}
            alt="ラムダ技術部"
          />
        </div>

        <h1>遅延証明書</h1>

        <p className="certificate-lead">
          YouTube動画投稿が以下のとおり遅れたことを証明します。
          <br />
          お急ぎのところ、ご迷惑をおかけしました。
        </p>

        <div className="summary-panel">
          <div>
            <span className="summary-label">遅延時間</span>
            <strong>{formatMinutes(delayMinutes)}</strong>
          </div>
          <div>
            <span className="summary-label">状態</span>
            <strong>{statusLabel(certificate.status)}</strong>
          </div>
        </div>

        <table className="certificate-table">
          <tbody>
            <tr>
              <th>予定投稿日時</th>
              <td>{formatDateTime(certificate.scheduledAt)}</td>
            </tr>
            <tr>
              <th>公開日時</th>
              <td>
                {certificate.publishedAt
                  ? formatDateTime(certificate.publishedAt)
                  : "未公開"}
              </td>
            </tr>
            <tr>
              <th>対象動画</th>
              <td>
                {certificate.videoUrl ? (
                  <a
                    href={certificate.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {title}
                  </a>
                ) : (
                  title
                )}
              </td>
            </tr>
          </tbody>
        </table>

        <div className="issuer">
          <p>{formatDate(certificate.checkedAt)}</p>
          <p>ラムダ技術部</p>
        </div>

        <section className="certificate-notes">
          <h2>ご利用上の注意</h2>
          <ol>
            <li>
              本証明書は、ラムダ技術部の動画更新が予定時刻より遅延したことを示すものです。
            </li>
            <li>
              本証明書の遅延時間は、毎週土曜日18時を基準とした自動計算値です。
            </li>
            <li>
              本証明書は、動画更新の遅延によって生じた損害等を補償するものではありません。
            </li>
          </ol>
        </section>

        <div className="print-actions has-text-centered">
          <button className="button is-primary" onClick={() => window.print()}>
            印刷 / PDF保存
          </button>
        </div>
      </section>
    );
  }

  render() {
    const { loading, error } = this.state;

    return (
      <Layout>
        <SEO
          title="遅延証明書"
          keywords={[`ラムダ技術部`, `遅延証明書`, `YouTube`]}
        />
        <Hero color="#455a64">
          <style>{certificateStyles}</style>
          {loading ? <p>証明書を読み込んでいます。</p> : null}
          {error ? (
            <div className="notification is-warning">
              <p>{error}</p>
              <p>
                <Link to="/videos#delay">遅延証明書一覧へ戻る</Link>
              </p>
            </div>
          ) : null}
          {this.renderCertificate()}
        </Hero>
      </Layout>
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

function formatDate(value) {
  if (!value) {
    return "";
  }

  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Tokyo",
  }).format(new Date(value));
}

function formatMinutes(minutes) {
  const safeMinutes = Number(minutes) || 0;
  const days = Math.floor(safeMinutes / 1440);
  const hours = Math.floor((safeMinutes % 1440) / 60);
  const restMinutes = safeMinutes % 60;

  if (days > 0) {
    return `${days}日 ${hours}時間 ${restMinutes}分 (${safeMinutes}分)`;
  }

  if (hours > 0) {
    return `${hours}時間 ${restMinutes}分 (${safeMinutes}分)`;
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

const certificateStyles = `
.delay-certificate {
  background: #fff;
  color: #263238;
  font-family: -apple-system, BlinkMacSystemFont, "Hiragino Sans", "Yu Gothic", sans-serif;
  margin: 0 auto;
  max-width: 820px;
  min-height: 1060px;
  padding: 3.5rem 4rem 3rem;
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.25);
}
.certificate-topline {
  align-items: center;
  border-bottom: 1px solid #cfd8dc;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 2.5rem;
  padding-bottom: 1rem;
}
.certificate-logo {
  display: block;
  height: auto;
  max-height: 4.5rem;
  object-fit: contain;
  width: 11rem;
}
.delay-certificate h1 {
  border-bottom: 3px solid #263238;
  border-top: 3px solid #263238;
  font-size: 2.8rem;
  letter-spacing: 0;
  margin: 0 auto 2.25rem;
  max-width: 17rem;
  padding: 0.7rem 0;
  text-align: center;
}
.certificate-lead {
  font-size: 1.12rem;
  line-height: 1.9;
  margin: 0 auto 2rem;
  max-width: 34rem;
  text-align: center;
}
.summary-panel {
  border: 2px solid #263238;
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 0 0 2rem;
}
.summary-panel > div {
  align-items: center;
  display: flex;
  justify-content: space-between;
  min-height: 5rem;
  padding: 1rem 1.25rem;
}
.summary-panel > div + div {
  border-left: 2px solid #263238;
}
.summary-label {
  color: #546e7a;
  font-size: 0.9rem;
  font-weight: bold;
}
.summary-panel strong {
  font-size: 1.55rem;
}
.certificate-table {
  border-collapse: collapse;
  margin: 0 0 1.5rem;
  width: 100%;
}
.certificate-table th,
.certificate-table td {
  border: 1px solid #b0bec5;
  padding: 0.9rem 1rem;
  vertical-align: top;
}
.certificate-table th {
  background: #eceff1;
  width: 11rem;
}
.issuer {
  margin: 2rem 0 3rem;
  text-align: right;
}
.issuer p {
  margin: 0.25rem 0;
}
.certificate-notes {
  border-top: 1px solid #cfd8dc;
  color: #455a64;
  font-size: 0.88rem;
  padding-top: 1.25rem;
}
.certificate-notes h2 {
  color: #263238;
  font-size: 1rem;
  margin: 0 0 0.6rem;
}
.certificate-notes ol {
  margin-left: 1.25rem;
}
.certificate-notes li {
  line-height: 1.7;
  margin-bottom: 0.35rem;
}
.print-actions {
  margin-top: 2rem;
}
@media screen and (max-width: 768px) {
  .delay-certificate {
    min-height: auto;
    padding: 2rem 1.25rem;
  }
  .certificate-topline {
    align-items: flex-start;
    flex-direction: column;
    gap: 1rem;
  }
  .certificate-logo {
    max-width: 100%;
    width: 10rem;
  }
  .delay-certificate h1 {
    font-size: 2.1rem;
  }
  .summary-panel {
    grid-template-columns: 1fr;
  }
  .summary-panel > div + div {
    border-left: 0;
    border-top: 2px solid #263238;
  }
  .summary-panel > div {
    align-items: flex-start;
    flex-direction: column;
    gap: 0.35rem;
  }
  .certificate-table th,
  .certificate-table td {
    display: block;
    width: auto;
  }
}
@media print {
  header,
  footer,
  .print-actions {
    display: none !important;
  }
  .hero,
  .hero-body,
  main {
    background: #fff !important;
    display: block !important;
    min-height: auto !important;
    padding: 0 !important;
  }
  .container {
    max-width: none !important;
    width: auto !important;
  }
  .delay-certificate {
    box-shadow: none;
    margin: 0;
    max-width: none;
    min-height: auto;
    padding: 0;
  }
  .delay-certificate a {
    color: #263238;
    text-decoration: none;
  }
}
`;

export default DelayCertificatePage;
