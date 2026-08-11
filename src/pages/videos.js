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
const LEGACY_DELAY_CERTIFICATES = [
  {
    id: "legacy-2022-11-08",
    scheduledAt: "2022-11-08T18:00:00+09:00",
    title: "【ケチ】いつでもできるJRの限界節約方法100選",
    videoUrl: "https://youtu.be/XCMAEwvU3J8",
    delayMinutes: 13455,
    href: "/certificate/certificate_of_delay_2022-11-08.pdf",
  },
  {
    id: "legacy-2022-08-20",
    scheduledAt: "2022-08-20T18:00:00+09:00",
    title: "仕事を押し付け合うスマートスピーカーを作った",
    videoUrl: "https://www.youtube.com/shorts/cyPCHMy15SI",
    delayMinutes: 225,
    href: "/certificate/certificate_of_delay_2022-08-20.pdf",
  },
  {
    id: "legacy-2022-08-13",
    scheduledAt: "2022-08-13T18:00:00+09:00",
    title: "【特定厨】花火の動画から居場所を特定するのちょろすぎて草",
    videoUrl: "https://youtu.be/DXSQ_hkZyW8",
    delayMinutes: 210,
    href: "/certificate/certificate_of_delay_2022-08-13.pdf",
  },
];

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
          {this.renderCurrentDelayStatus()}
          <p>
            ラムダ技術部では毎週土曜日18時に投稿予定の動画が10分以上遅れた場合、遅延証明書を掲載いたします。
            <br />
            遅延の証明が必要な際にダウンロードしてお使いください。
          </p>
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
    const { latest, loadingCertificates, certificateError } = this.state;

    const isDelayed = latest && latest.status === "delayed";
    const isNormal = latest && !isDelayed;
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
      <section
        className={`delay-status-box ${
          isDelayed ? "is-delayed" : isNormal ? "is-normal" : "is-unknown"
        }`}
      >
        <p className="delay-status-heading">現在の遅延状況</p>
        <p className="delay-status-value">{currentStatus}</p>
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
    const certificateRows = buildCertificateRows(certificates, mockMode);

    if (!certificateRows.length && loadingCertificates) {
      return <p>遅延証明書を読み込んでいます。</p>;
    }

    return (
      <>
        {loadingCertificates ? <p>遅延証明書を読み込んでいます。</p> : null}
        {certificateError ? (
          <div className="notification is-warning">
            <p>{certificateError}</p>
            <p>電子版の取得に失敗した場合も、過去のPDF版は表示されます。</p>
          </div>
        ) : null}
        {!certificateRows.length ? (
          <div className="notification is-info">
            現在、発行済みの遅延証明書はありません。
          </div>
        ) : (
          <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
            <thead>
              <tr>
                <th>日時</th>
                <th>タイトル</th>
                <th>遅れ</th>
              </tr>
            </thead>
            <tbody>
              {certificateRows.map(certificate =>
                this.renderCertificateRow(certificate)
              )}
            </tbody>
          </table>
        )}
      </>
    );
  }

  renderCertificateRow(certificate) {
    return (
      <tr key={certificate.id}>
        <td>{formatDate(certificate.scheduledAt)}</td>
        <td>{certificate.title}</td>
        <td>
          {certificate.href ? (
            <a
              className="button is-primary"
              href={certificate.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {certificate.delayLabel}
            </a>
          ) : (
            <Link className="button is-primary" to={certificate.to}>
              {certificate.delayLabel}
            </Link>
          )}
        </td>
      </tr>
    );
  }
}

const delaySectionStyles = `
#delay .delay-status-box {
  background: #fff;
  border-left: 0.55rem solid #90a4ae;
  border-radius: 6px;
  box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.16);
  color: #263238;
  margin: 1.5rem 0;
  padding: 1.25rem 1.5rem;
}
#delay .delay-status-box.is-normal {
  border-left-color: #009688;
}
#delay .delay-status-box.is-delayed {
  border-left-color: #ff9800;
}
#delay .delay-status-box.is-unknown {
  border-left-color: #546e7a;
}
#delay .delay-status-heading {
  color: #455a64;
  font-size: 0.9rem;
  font-weight: bold;
  margin: 0 0 0.35rem;
}
#delay .delay-status-value {
  font-size: 2rem;
  font-weight: bold;
  line-height: 1.25;
  margin: 0;
}
@media screen and (max-width: 560px) {
  #delay .delay-status-box {
    padding: 1rem;
  }
  #delay .delay-status-value {
    font-size: 1.55rem;
  }
}
`;

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

function buildCertificateRows(certificates, mockMode) {
  const electronicRows = certificates.map(certificate => ({
    id: certificate.id,
    scheduledAt: certificate.scheduledAt,
    title: certificate.videoUrl ? (
      <a target="_blank" rel="noopener noreferrer" href={certificate.videoUrl}>
        {certificate.videoTitle}
      </a>
    ) : (
      statusLabel(certificate.status)
    ),
    delayLabel: formatMinutes(getEffectiveDelayMinutes(certificate)),
    to: `/delay-certificate?id=${encodeURIComponent(
      certificate.id
    )}${getMockQuerySuffix(mockMode)}`,
  }));
  const legacyRows = LEGACY_DELAY_CERTIFICATES.map(certificate => ({
    ...certificate,
    title: (
      <a target="_blank" rel="noopener noreferrer" href={certificate.videoUrl}>
        {certificate.title}
      </a>
    ),
    delayLabel: formatMinutes(certificate.delayMinutes),
  }));

  return [...electronicRows, ...legacyRows].sort(
    (a, b) => new Date(b.scheduledAt) - new Date(a.scheduledAt)
  );
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
