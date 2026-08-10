import React, { Component } from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import Hero from "../components/hero";
import SEO from "../components/seo";
import { getMockCertificate } from "../lib/delay-certificate-mocks";

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

    return (
      <section className="delay-certificate">
        <div className="certificate-number">No. {certificate.id}</div>
        <h1>遅延証明書</h1>
        <p className="lead">
          下記の動画投稿が予定時刻より遅延していることを証明します。
        </p>
        <dl>
          <dt>予定投稿日時</dt>
          <dd>{formatDateTime(certificate.scheduledAt)}</dd>
          <dt>公開日時</dt>
          <dd>
            {certificate.publishedAt
              ? formatDateTime(certificate.publishedAt)
              : "未公開"}
          </dd>
          <dt>遅延時間</dt>
          <dd>{formatMinutes(getEffectiveDelayMinutes(certificate))}</dd>
          <dt>動画タイトル</dt>
          <dd>{title}</dd>
          <dt>状態</dt>
          <dd>{statusLabel(certificate.status)}</dd>
        </dl>
        {certificate.videoUrl ? (
          <p className="video-link">
            <a
              href={certificate.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              対象動画を確認する
            </a>
          </p>
        ) : null}
        <div className="issuer">
          <p>発行者: ラムダ技術部</p>
          <p>確認日時: {formatDateTime(certificate.checkedAt)}</p>
        </div>
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
  margin: 0 auto;
  max-width: 840px;
  min-height: 1000px;
  padding: 4rem;
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.25);
}
.delay-certificate h1 {
  border-bottom: 4px solid #263238;
  font-size: 3rem;
  letter-spacing: 0;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  text-align: center;
}
.certificate-number {
  font-family: monospace;
  text-align: right;
}
.delay-certificate .lead {
  font-size: 1.15rem;
  margin-bottom: 2rem;
  text-align: center;
}
.delay-certificate dl {
  display: grid;
  grid-template-columns: 10rem 1fr;
  gap: 1rem 1.5rem;
  margin: 2rem 0;
}
.delay-certificate dt {
  font-weight: bold;
}
.delay-certificate dd {
  margin: 0;
}
.issuer {
  border-top: 1px solid #cfd8dc;
  margin-top: 3rem;
  padding-top: 1.5rem;
  text-align: right;
}
.print-actions {
  margin-top: 2rem;
}
@media screen and (max-width: 768px) {
  .delay-certificate {
    min-height: auto;
    padding: 2rem 1.25rem;
  }
  .delay-certificate h1 {
    font-size: 2.25rem;
  }
  .delay-certificate dl {
    grid-template-columns: 1fr;
    gap: 0.35rem;
  }
  .delay-certificate dd {
    margin-bottom: 1rem;
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
}
`;

export default DelayCertificatePage;
