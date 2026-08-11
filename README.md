# ラムダ技術部 公式サイト

YouTubeチャンネル「ラムダ技術部」の公式サイトです。プロフィール、問い合わせ先、動画関連コンテンツ、利用ガイドライン、関連作品、遅延証明書などを掲載しています。

公開サイト: [https://ラムダ.com](https://ラムダ.com)

## このリポジトリで扱うもの

| 領域 | 内容 |
| --- | --- |
| 公式サイト | ラムダ技術部のプロフィール、SNSリンク、問い合わせ先、関連コンテンツを掲載します。 |
| 動画関連ページ | YouTubeチャンネル紹介、遅延証明書、過去のPDF版遅延証明書を掲載します。 |
| 遅延証明書 | YouTube Data API、Netlify Scheduled Functions、Netlify Blobs を使って電子版証明書を更新します。 |
| 静的資料 | 過去のPDF版遅延証明書など、直接配信するファイルを `static/` に置いています。 |

## 主なページ

| URL | 実装 | 役割 |
| --- | --- | --- |
| `/` | `src/pages/index.js` | トップページ。ラムダ技術部のブランド表示とSNSリンク。 |
| `/about` | `src/pages/about.js` | プロフィール、学歴、職歴。 |
| `/videos` | `src/pages/videos.js` | YouTubeチャンネル紹介、現在の遅延状況、遅延証明書一覧。 |
| `/delay-certificate` | `src/pages/delay-certificate.js` | 電子版遅延証明書の詳細表示。 |
| `/contact` | `src/pages/contact.js` | 問い合わせフォームと連絡先リンク。 |
| `/guidelines` | `src/pages/guidelines.js` | コンテンツ利用ガイドライン。 |
| `/works` | `src/pages/works.js` | 関連作品、プロジェクト。 |
| `/pgp` | `src/pages/pgp.js` | 関連コンテンツ。 |
| `/qa` | `src/pages/qa.js` | アンケートページ。 |

## 技術スタック

- Gatsby 2
- React 16
- Bulma
- `gatsby-image` / `gatsby-plugin-sharp` / `gatsby-transformer-sharp`
- Netlify Functions
- Netlify Scheduled Functions
- Netlify Blobs
- YouTube Data API v3
- Yarn

古いGatsby/React世代の構成です。依存関係の更新やGatsbyのメジャーアップグレードは、通常のコンテンツ修正とは分けて扱ってください。

## 開発コマンド

```sh
yarn install
yarn develop
yarn build
yarn serve
```

ローカル環境で画像処理系のネイティブ依存関係に詰まる場合は、デザイン確認用に次の環境変数を付けて起動できます。

```sh
LOCAL_DESIGN_PREVIEW=1 yarn develop
LOCAL_DESIGN_PREVIEW=1 yarn build
```

`yarn test` は現状プレースホルダーです。変更確認では主に `yarn build` を使います。

## 遅延証明書機能

`/videos` では、毎週土曜日18時の動画投稿予定に対する現在の遅延状況と、発行済みの遅延証明書を表示します。

- `netlify/functions/check-youtube-delay.js`
  - 10分おきに実行される Scheduled Function です。
  - YouTubeの最新投稿を確認し、土曜18時基準の状態を更新します。
- `netlify/functions/delay-certificates.js`
  - 証明書一覧と証明書詳細を返す通常の Netlify Function です。
- `netlify/functions/lib/delay-certificates.js`
  - YouTube API連携、遅延判定、Netlify Blobs の読み書きをまとめています。
- `src/lib/delay-certificate-mocks.js`
  - ローカル表示確認用のモックデータです。

ローカルでは次のURLで表示状態を確認できます。

```text
/videos?mock=published
/videos?mock=delayed
```

### 必要な環境変数

Netlify側で次の環境変数を設定します。

| 変数名 | 用途 |
| --- | --- |
| `YOUTUBE_API_KEY` | YouTube Data API v3 のAPIキー。 |
| `YOUTUBE_CHANNEL_ID` | ラムダ技術部のYouTubeチャンネルID。 |
| `YOUTUBE_UPLOADS_PLAYLIST_ID` | チャンネルのuploads playlist ID。 |

## ディレクトリ構成

```text
.
├── src/
│   ├── components/         # Layout、Header、Footer、Hero、SEOなどの共通部品
│   ├── images/             # Reactコンポーネントからimportする画像
│   ├── lib/                # フロントエンド側の補助ロジック、モックデータ
│   └── pages/              # Gatsbyのページコンポーネント
├── static/
│   ├── certificate/        # 過去のPDF版遅延証明書
│   └── pgp/                # 関連コンテンツの静的ファイル
├── netlify/
│   └── functions/          # Netlify Functions と Scheduled Functions
├── gatsby-config.js        # Gatsby設定、siteMetadata、plugin設定
├── netlify.toml            # Netlify Functions とcron設定
├── package.json            # 依存関係とnpm scripts
└── CODEX.md                # Codex向けの開発メモ
```

## 開発時の注意

- 公開向けサイトなので、リンク切れ、古いプロフィール、自然でない日本語コピーに注意してください。
- 外部リンクは `target="_blank"` と `rel="noopener noreferrer"` を付けます。
- トップレベルページを追加/削除する場合は、`src/components/header.js` と `src/components/footer.js` の両方を確認してください。
- Reactコンポーネントで使う画像は原則 `src/images/`、直接URLで配信する静的ファイルは `static/` に置きます。
- `public/` と `.cache/` はGatsbyの生成物です。通常は直接編集しません。
- Netlify Blobs に保存された遅延証明書データはGit管理されません。

## 検証

変更内容に応じて、少なくとも次を確認します。

```sh
yarn build
```

表示や導線を変えた場合は、ローカルサーバーで対象ページも確認します。

```sh
yarn develop
```

遅延証明書まわりを触った場合は、通常表示に加えて `?mock=published` と `?mock=delayed` の表示も確認してください。
