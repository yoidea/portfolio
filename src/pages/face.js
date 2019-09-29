import React, { Component } from "react";

import Layout from "../components/layout";
import Hero from "../components/hero";
import SEO from "../components/seo";
import { Heading } from "../components/typography";

import "./animista.css";

class ContactPage extends Component {
  render() {
    return (
      <Layout>
        <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
        <Hero color="#607d8b">
          <Heading>私の顔について</Heading>
          <p>端的に言うと、私の顔は俗に言う「フリー素材」であることを認めています。</p>
          <p>私の顔写真は以下のライセンスに反しない限り無償でご利用できます。</p>
          <p>あなたは私の顔写真について以下のことが許可されます。</p>
          <ol>
            <li>どのような形式のファイルであっても顔写真を複製したり、再配布できます。</li>
            <li>顔写真を加工したり、改変したり、別の作品の一部として使用することができます。</li>
          </ol>
          <p>あなたがライセンスの条件に従っている限り、私がこれらの自由を取り消すことはできません。</p>
          <p>また、あなたは私の顔写真について以下のことが禁止されます。</p>
          <ol>
            <li>営利目的で顔写真を利用してはなりません。</li>
            <li>公序良俗に反する目的での利用。</li>
            <li>私のイメージを損なうような攻撃的・差別的・性的・過激な利用。</li>
            <li>反社会的勢力や違法行為に関わる利用。</li>
          </ol>
          <p>顔写真を加工したり、改変したり、別の作品の一部として使用した場合に、あなたはあなたの貢献部分を元の顔写真と同じライセンスの下に頒布しなければなりません。</p>
          <p>あなたは、このライセンスが他の者に許諾することを法的に制限するようないかなる法的規定も技術的手段も適用してはなりません。</p>
          <p>営利目的で顔写真をご利用の場合は有償にて対応させていただきます。お問合せからご相談ください。</p>
        </Hero>
      </Layout>
    );
  }
}

export default ContactPage;
