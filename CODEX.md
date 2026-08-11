# CODEX.md

## プロジェクト概要

このリポジトリは、YouTubeチャンネル「ラムダ技術部」の公式サイトです。
チャンネル/プロフィール、お問い合わせ先、YouTube関連コンテンツ、その他の関連コンテンツ、
関連作品などを掲載しています。

このサイトは公開向けのクリエイター/チャンネル公式サイトとして扱ってください。
複雑なアプリケーション機能を足すことよりも、掲載内容の正確性、日本語コピーの自然さ、
リンクの正しさ、モバイルでの読みやすさ、軽量な静的サイト体験を重視します。

## 技術スタック

- フレームワーク: Gatsby 2
- UI: React 16。クラスコンポーネントと関数コンポーネントが混在
- スタイリング: Bulma、ローカルCSS、既存コンポーネント内のインラインスタイル
- 画像: `gatsby-image`、`gatsby-plugin-sharp`、`gatsby-transformer-sharp`
- メタデータ: `src/components/seo.js` 経由の `react-helmet`
- パッケージマネージャー: Yarn。`yarn.lock` をコミット済み
- テスト: Jest設定あり。ただし現状の `test` script はプレースホルダー

主要なプロジェクトメタデータと scripts は `package.json` にあります。
Gatsby のサイトメタデータと plugins は `gatsby-config.js` にあります。

## よく使うコマンド

- 依存関係のインストール: `yarn install`
- ローカル開発サーバー起動: `yarn develop`
- 本番ビルド: `yarn build`
- ビルド済みサイトの確認: `yarn serve`
- `src` 配下の JS/JSX 整形: `yarn format`
- テスト: `yarn test`

注意: 現状の `yarn test` は Gatsby の unit testing ガイドを表示するだけです。
実テストが追加されるまでは、主な検証コマンドとして `yarn build` を使ってください。

## リポジトリ構成

- `src/pages/`: Gatsby のページコンポーネント。各ファイルがルートに対応します。
- `src/components/`: 共通レイアウト、ナビゲーション、Hero、SEO、タイポグラフィ、
  タイムライン、メッセージ、画像、小さな演出など。
- `src/images/`: Reactコンポーネントから import して使う画像。
- `public/`: Gatsby の生成物や、パス指定で配信する静的ファイル。
  意図的な静的ファイルを除き、生成されたビルド成果物は編集しないでください。
- `gatsby-config.js`: サイトメタデータ、画像処理、manifest、Sass plugin。
- `jest.config.js`、`jest-preprocess.js`、`__mocks__/`: Jest設定。

## 重要なページ

- `/` (`src/pages/index.js`): チャンネル名とSNSリンクを載せたメインページ。
- `/about` (`src/pages/about.js`): プロフィール、学歴、職歴のタイムライン。
- `/videos` (`src/pages/videos.js`): チャンネル説明、遅延証明書などの動画関連コンテンツ。
- `/contact` (`src/pages/contact.js`): Google Form の埋め込みと関連コンテンツへのリンク。
- `/guidelines` (`src/pages/guidelines.js`): 動画等コンテンツ利用ガイドライン。
- `/pgp` (`src/pages/pgp.js`): 関連コンテンツのページ。
- `/works` (`src/pages/works.js`): 関連作品/プロジェクト。
- `/face` (`src/pages/face.js`): ナビゲーションからリンクされている Face 関連ページ。
- `/qa` (`src/pages/qa.js`): アンケートページ。

## 既存の設計パターン

- ほとんどのページは `Layout` で包み、`SEO` でメタデータを設定し、
  主要セクションを共通の `Hero` コンポーネントで表示します。
- `Hero` は Bulma の full-height hero セクションを基本にし、背景色と
  ページ内アンカー用の `id` を指定できます。
- デスクトップのナビゲーションは `Header`、モバイル下部ナビゲーションは `Footer` にあります。
  トップレベルページを追加/削除するときは両方を同期してください。
- セクション見出しには `src/components/typography.js` の `Heading` を使います。
- 表示テキストは日本語が中心です。自然な日本語を優先し、クリエイター/チャンネルの雰囲気に合わせます。
- 既存コードにはクラスコンポーネントと関数コンポーネントが混在しています。
  小さな変更では近くの書き方に合わせ、広範囲の書き換えは避けてください。

## 開発方針

- 公開向けのアイデンティティを保つこと。`ラムダ技術部` が最重要のブランドシグナルです。
- 変更範囲は小さく保ってください。明示的な依頼がない限り、フレームワーク更新、
  依存関係の大幅変更、大規模リライトは避けます。
- `yarn.lock` があるため、パッケージ操作は原則 `yarn` を使います。
- コンテンツやナビゲーションを変更した場合は、デスクトップとモバイルの両方を確認してください。
- 外部リンクを追加する場合は、`target="_blank"` と `rel="noopener noreferrer"` を付けます。
- 新しいページを追加する場合は `src/pages/` にファイルを追加し、グローバルに見せたいページなら
  `src/components/header.js` と `src/components/footer.js` の両方を更新します。
- Reactコンポーネントで使う画像は `src/images/` に置き、コンポーネントから import します。
- 公開前に日本語の誤字、古い情報、リンク切れを確認してください。
- `.cache/` や `public/` 配下の多くの生成ファイルは編集しないでください。

## 検証チェックリスト

変更を終える前に、内容に応じて最小限かつ有効な確認を行います。

1. Gatsby のコンパイルと本番レンダリング確認: `yarn build`
2. レイアウト、ナビゲーション、フォーム、レスポンシブ挙動を変えた場合の表示確認: `yarn develop`
3. 編集した外部URL、Google Form埋め込み、ダウンロード、`public/` 参照ファイルの手動リンク確認

依存関係や Node 互換性の問題が出た場合は、依存関係を変更する前に、
実行したコマンド、Node/Yarn のバージョン、エラー出力を記録してください。

## 技術的負債と注意点

- Gatsby 2、React 16、`node-sass` は古い依存関係です。アップグレードは別の移行タスクとして扱ってください。
- 一部の JSX に生の `class` 属性があります。新規 JSX では `className` を使い、
  同じファイルを編集する場合は近くの `class` も修正を検討してください。
- `gatsby-plugin-offline` はインストールされていますが、`gatsby-config.js` ではコメントアウトされています。
- 現状の test script は実テストではありません。
