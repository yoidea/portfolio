import React, { Component } from "react";

import Layout from "../components/layout";
import Hero from "../components/hero";
import SEO from "../components/seo";
import { Heading, CodeBlock } from "../components/typography";

import "./animista.css";

class PgpPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Layout>
        <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
        <Hero color="#263238">
          <Heading>動画等コンテンツ利用ガイドライン</Heading>

          <section className="block">
            <p>ラムダ技術部が制作したコンテンツは、教育目的での利用（学校の課題、授業での利用、学会発表など）やメディアでのツ紹介（ブログ記事、ニュースでの紹介など）に限って、下記のガイドラインを遵守していただければ<strong>無償で利用できます</strong>。<strong>利用許可を待つ必要はありません</strong>。</p>
          </section>

          <section className="block">
            <div class="notification is-primary has-text-centered">
              ガイドライン範囲外の特殊な用途での利用をご検討の方は、ご予算や利用方法をご提示の上でお問い合わせフォームからご相談ください。
            </div>
          </section>

          <section className="block">
            <Heading>動画利用ルール（小学生向け）</Heading>
            <p>ラムダ技術部の動画は、学校や習い事の課題に使えます。使うときには次のルールを守りましょう。</p>
            <ol>
              <li>動画と同じことを試してみたり、動画から知ったことを課題に使っていいです。</li>
              <li>動画を画像にして使ったり、動画で話していることを文字にして使ってもいいです。</li>
              <li>発表で動画をみんなに見せてもいいです。</li>
              <li>動画を編集したり、書き足したりしてもいいです。その場合はどこを変えたかを書きましょう。</li>
              <li>自分で考えた部分と、動画を参考にした部分は分けて書きましょう。</li>
              <li>完成したものにラムダ技術部は責任を持てません。しっかり自分で確認してください。</li>
            </ol>
          </section>

          <section className="block">
            <Heading>教育目的での利用について</Heading>
            <p>学校や塾の課題、調べ学習での発表、授業で教材として利用、学会発表などのことを指します。</p>
            <ol>
              <li>動画を参考にするのは何ら問題ありません。</li>
              <li>動画のスクリーンショットや動画内容の文字起こしなどを活用いただけます。</li>
              <li>動画の一部やすべてを発表の際に放映することができます。</li>
              <li>必要があれば加工編集、加筆修正してお使いいただけます。その際は<strong>必ず変更箇所を明記</strong>するようにしてください。</li>
              <li>課題に利用する場合は自分の主張と参考にした部分を明確にするように気をつけましょう。</li>
              <li>最終成果物に対してラムダ技術部は一切責任を負いません。</li>
            </ol>
          </section>

          <section className="block">
            <Heading>メディアでの利用について</Heading>
            <p>ブログやまとめサイトでの動画紹介、ネットニュース、報道番組などでの動画紹介のことを指します。</p>
            <ol>
              <li>Google社、ドワンゴ社、X社が定める規約範囲内で埋め込み、引用などはご自由に行っていただいて構いません。</li>
              <li>動画等のスクリーンショットや一部または全てのキャプチャを使用する場合は<strong>必ず出典を明記</strong>してください。出典は十分に読み取れる大きさで、チャンネル名、タイトル、URLなど対象のコンテンツを特定できる情報を一つ以上表記してください。</li>
              <li>動画の一部やすべてを発表の際に放映することができます。</li>
              <li>別途でYouTubeチャンネルや制作活動についてご紹介頂ける場合は、常に画面内に出典が記載されていなくても問題ありません。</li>
              <li>加工編集や加筆修正してお使いになる場合は<strong>変更箇所を明記</strong>してください。</li>
              <li>著作権の譲渡はいたしかねます。</li>
              <li>事前の確認は任意ですが、紹介内容に誤りが見つかった場合は<strong>必ず修正に応じてください</strong>。紙面など物理的に修正が不可能な媒体の場合は媒体独自の方法で誤りを訂正してください。</li>
            </ol>
          </section>
        </Hero>
      </Layout>
    );
  }
}

export default PgpPage;
