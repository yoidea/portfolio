# CODEX.md

## プロジェクト概要

このリポジトリは、YouTubeチャンネル「ラムダ技術部」の公式サイトです。
チャンネル/プロフィール、お問い合わせ先、YouTube関連コンテンツ、利用ガイドライン、
関連作品、遅延証明書などを掲載しています。

公開向けの公式サイトとして、掲載内容の正確性、日本語コピーの自然さ、リンクの正しさ、
モバイルでの読みやすさ、軽量な静的サイト体験を重視します。

## Astro移行方針

長期作業用ブランチ `rewrite/astro` で、公式サイトを Gatsby から Astro へ書き直しています。
完成するまでは `master` にマージせず、Netlify Branch Deploy Preview で確認しながら進めます。
完成後に `master` へ一括マージして本番公開します。

- フレームワーク: Astro
- CSSフレームワーク: Tailwind
- UIコンポーネントライブラリ: 導入しない
- Figma: 原則使わない
- Storybook: 初期導入しない。まずは `/design-system` で進める
- デザイン管理: Tailwind theme、CSS custom properties、Astroコンポーネントを併用する
- 遅延証明書機能: 現行仕様を維持する
- プラットフォーム: Netlify継続を本命とする

デザインは、現行サイトとの見た目の互換性を重視しません。
対企業の公式サイトとして情報がモダンに整理され、初見でも信頼しやすい構成を優先します。
ラムダ技術部らしい遊びは、無理に入れず、後から差し込める余地を残してください。

トップページでは、最初に `ラムダ技術部` の紹介、各種リンク、連絡先が伝わることを重視します。
コンテンツはまず現行サイトから移植し、本番公開までに必要に応じて文章やページ構成を調整します。

URLは古くからあるものを基本的に維持します。
ただし `/qa` や `/delay-certificate` など新しめのページ、またはページ構成変更に伴うURL変更は許容します。
URLを変える場合は、リダイレクトや旧URLからの導線を検討してください。

`/design-system` は開発中の確認ページとして使います。
本番公開時は、一般公開が必要な理由がなければ削除するか、少なくともナビゲーションから外して `noindex` にしてください。

Astro移行中に新しい機能、外部API、環境変数、運用手順、モック、壊しやすい仕様が増えた場合は、
この `CODEX.md` に追記してください。

## 技術スタック

- Astro
- Tailwind CSS
- CSS custom properties
- Netlify Functions
- Netlify Scheduled Functions
- Netlify Blobs
- YouTube Data API v3
- pnpm

主要なプロジェクトメタデータと scripts は `package.json` にあります。
Astro設定は `astro.config.mjs`、Netlify設定は `netlify.toml` にあります。

## よく使うコマンド

- 依存関係のインストール: `pnpm install`
- ローカル開発サーバー起動: `pnpm dev`
- 本番ビルド: `pnpm build`
- ビルド済みサイトの確認: `pnpm preview`

`pnpm approve-builds` が必要な場合、`esbuild` と `sharp` はAstroの正当な依存として承認して構いません。

## リポジトリ構成

- `src/pages/`: Astro のページコンポーネント。各ファイルがルートに対応します。
- `src/layouts/`: 共通レイアウト。
- `src/components/`: Astroコンポーネント。Header、Footer、ページイントロ、タイムラインなど。
- `src/styles/`: Tailwind entrypoint とグローバルCSS、デザイントークン。
- `src/images/`: Astroコンポーネントから import して使う画像。
- `public/`: Astroで直接配信する静的ファイル。PDFやPGP関連ファイルを置きます。
- `netlify/functions/`: 遅延証明書用の Netlify Functions と Scheduled Functions。
- `dist/`: Astro のビルド成果物。Git管理しません。

## 重要なページ

- `/` (`src/pages/index.astro`): ラムダ技術部の紹介、SNSリンク、連絡先導線。
- `/about` (`src/pages/about.astro`): プロフィール、学歴、職歴。
- `/videos` (`src/pages/videos.astro`): チャンネル説明、現在の遅延状況、遅延証明書一覧。
- `/delay-certificate` (`src/pages/delay-certificate.astro`): 電子版遅延証明書の詳細表示。
- `/contact` (`src/pages/contact.astro`): Google Form の埋め込みと関連リンク。
- `/guidelines` (`src/pages/guidelines.astro`): 動画等コンテンツ利用ガイドライン。
- `/pgp` (`src/pages/pgp.astro`): 関連コンテンツのページ。
- `/works` (`src/pages/works.astro`): 関連作品/プロジェクト。
- `/face` (`src/pages/face.astro`): 顔の利用ライセンス。
- `/qa` (`src/pages/qa.astro`): アンケートページ。
- `/design-system` (`src/pages/design-system.astro`): 開発中のデザイン確認ページ。`noindex`。

## 遅延証明書機能

現行仕様を維持します。

- Netlify Scheduled Function `check-youtube-delay` が10分おきに動きます。
- YouTube Data APIで最新投稿を確認します。
- Netlify Blobs の `delay-certificates` store に状態を保存します。
- 保存キーは `latest.json`、`certificates/index.json`、`certificates/{id}.json` です。
- `/videos` は一覧取得、`/delay-certificate` は詳細取得を行います。
- ローカル確認用に `?mock=published` と `?mock=delayed` を維持します。

必要な環境変数:

- `YOUTUBE_API_KEY`
- `YOUTUBE_CHANNEL_ID`
- `YOUTUBE_UPLOADS_PLAYLIST_ID`

## 開発方針

- 公開向けのアイデンティティを保つこと。`ラムダ技術部` が最重要のブランドシグナルです。
- 変更範囲は意図に合わせて保ちます。Astro移行ブランチではGatsby由来コードの整理を許容します。
- 外部リンクを追加する場合は、`target="_blank"` と `rel="noopener noreferrer"` を付けます。
- `iframe` には内容が分かる `title` を付けます。
- 画像には意味のある `alt` を付けます。装飾画像の場合は空の `alt=""` を検討してください。
- 直接配信する静的ファイルは `public/` に置きます。
- Netlify Blobs に保存された遅延証明書データはGit管理されません。
- 公開前に日本語の誤字、古い情報、リンク切れを確認してください。

## 検証チェックリスト

変更を終える前に、内容に応じて最小限かつ有効な確認を行います。

1. Astro の本番ビルド確認: `pnpm build`
2. レイアウト、ナビゲーション、フォーム、レスポンシブ挙動を変えた場合の表示確認: `pnpm dev`
3. 遅延証明書まわりを変えた場合のモック確認: `/videos?mock=published`、`/videos?mock=delayed`
4. 編集した外部URL、Google Form埋め込み、ダウンロード、`public/` 参照ファイルの手動リンク確認

## 技術的負債と注意点

- Astro移行は初期段階です。細部のデザイン、コピー、導線はブランチプレビューで詰めてください。
- `/works` の旧Gatsby実装にあったHeroku起動待ち演出は移植せず、通常リンクに置き換えています。
- `/pgp` は公開鍵全文の画面内表示をやめ、ダウンロード中心に簡略化しています。
- `static/` は旧Gatsby由来です。Astroで配信するファイルは `public/` に置いてください。
- 本番公開前に `/design-system` を残すか、削除するか、`noindex` のまま非ナビゲーションにするか判断してください。
