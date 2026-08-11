# ラムダ技術部 公式サイト

YouTubeチャンネル「ラムダ技術部」の公式サイトです。プロフィール、問い合わせ先、動画関連コンテンツ、利用ガイドライン、関連作品、遅延証明書などを掲載しています。

公開サイト: [https://ラムダ.com](https://ラムダ.com)

## Astro移行ブランチについて

このブランチでは、公式サイトを Gatsby から Astro へ書き直しています。完成までは `rewrite/astro` 上で開発し、Netlify Branch Deploy Preview で確認します。完成後に `master` へ一括マージして本番公開する方針です。

## 技術スタック

- Astro
- Tailwind CSS
- CSS custom properties
- Netlify Functions
- Netlify Scheduled Functions
- Netlify Blobs
- YouTube Data API v3
- pnpm

UIコンポーネントライブラリ、Figma、Storybookは初期導入していません。デザイン確認は `/design-system` で行います。

## 開発コマンド

```sh
pnpm install
pnpm dev
pnpm build
pnpm preview
```

この環境ではpnpmのビルドスクリプト承認が必要になる場合があります。`esbuild` と `sharp` はAstroの正当な依存です。

```sh
pnpm approve-builds
```

## 主なページ

| URL | 実装 | 役割 |
| --- | --- | --- |
| `/` | `src/pages/index.astro` | トップページ。ラムダ技術部の紹介、SNSリンク、連絡先導線。 |
| `/about` | `src/pages/about.astro` | プロフィール、学歴、職歴。 |
| `/videos` | `src/pages/videos.astro` | YouTubeチャンネル紹介、現在の遅延状況、遅延証明書一覧。 |
| `/delay-certificate` | `src/pages/delay-certificate.astro` | 電子版遅延証明書の詳細表示。 |
| `/contact` | `src/pages/contact.astro` | 問い合わせフォームと関連リンク。 |
| `/guidelines` | `src/pages/guidelines.astro` | コンテンツ利用ガイドライン。 |
| `/works` | `src/pages/works.astro` | 関連作品、プロジェクト。 |
| `/pgp` | `src/pages/pgp.astro` | 関連コンテンツ。 |
| `/qa` | `src/pages/qa.astro` | アンケートページ。 |
| `/design-system` | `src/pages/design-system.astro` | 開発中のデザイン確認ページ。noindex。 |

## 遅延証明書機能

`/videos` では、毎週土曜日18時の動画投稿予定に対する現在の遅延状況と、発行済みの遅延証明書を表示します。

- `netlify/functions/check-youtube-delay.js`
  - 10分おきに実行される Scheduled Function です。
  - YouTubeの最新投稿を確認し、土曜18時基準の状態を更新します。
- `netlify/functions/delay-certificates.js`
  - 証明書一覧と証明書詳細を返す通常の Netlify Function です。
- `netlify/functions/lib/delay-certificates.js`
  - YouTube API連携、遅延判定、Netlify Blobs の読み書きをまとめています。

ローカルでは次のURLで表示状態を確認できます。

```text
/videos?mock=published
/videos?mock=delayed
/delay-certificate?id=mock-published&mock=published
/delay-certificate?id=mock-delayed&mock=delayed
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
│   ├── components/         # Astroコンポーネント
│   ├── images/             # Astroからimportする画像
│   ├── layouts/            # 共通レイアウト
│   ├── pages/              # Astroのページ
│   └── styles/             # Tailwind entrypoint とグローバルCSS
├── public/
│   ├── certificate/        # 過去のPDF版遅延証明書
│   └── pgp/                # 関連コンテンツの静的ファイル
├── netlify/
│   └── functions/          # Netlify Functions と Scheduled Functions
├── astro.config.mjs
├── netlify.toml
├── package.json
└── CODEX.md
```

## 検証

```sh
pnpm build
```

表示や導線を変えた場合は、ローカルサーバーで対象ページも確認します。

```sh
pnpm dev
```

遅延証明書まわりを触った場合は、通常表示に加えて `?mock=published` と `?mock=delayed` の表示も確認してください。
