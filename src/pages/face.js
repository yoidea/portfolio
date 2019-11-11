import React, { Component } from "react";

import Layout from "../components/layout";
import Hero from "../components/hero";
import SEO from "../components/seo";
import { Heading } from "../components/typography";

import CC from "../images/cc_white.svg";
import BY from "../images/attribution_icon_white.svg";
import NC from "../images/nc_white.svg";
import "./animista.css";

class FacePage extends Component {
  render() {
    return (
      <Layout>
        <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
        <Hero color="#607d8b">
          <section>
            <Heading>私の顔について</Heading>

            <div class="notification is-primary has-text-centered">
              <img src={CC} alt="CC" height="72px" style={{ margin: "10px" }} />
              <img
                src={BY}
                alt="Attribution"
                height="72px"
                style={{ margin: "10px" }}
              />
              <img
                src={NC}
                alt="Non-Commerical"
                height="72px"
                style={{ margin: "10px" }}
              />
              <p>
                <a
                  className="is-size-3"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://creativecommons.org/licenses/by-nc/4.0/legalcode.ja"
                >
                  BY-NC 4.0
                </a>
              </p>
            </div>

            <p>私の顔は以下のライセンスに反しない限り無償で利用できます。</p>
            <p>
              基本的には
              <a
                className="has-text-primary"
                target="_blank"
                rel="noopener noreferrer"
                href="https://creativecommons.org/licenses/by-nc/4.0/legalcode.ja"
              >
                クリエイティブ・コモンズ 表示 - 非営利 4.0 国際
              </a>
              に従いライセンスを適用します。明言の無いものについてはそれに準拠するとお考えください。
            </p>
          </section>

          <section>
            <Heading>利用条件</Heading>
            <p>私の顔を利用するには以下の条件に従う必要があります。</p>
            <ol>
              <li>営利目的で顔を利用できません。（営利利用は別条件）</li>
              <li>公序良俗に反する目的での利用はできません。</li>
              <li>
                不特定多数に公開されている形態で利用する場合は、何らかの形でクレジットを明記しなければなりません。
              </li>
            </ol>
          </section>

          <section>
            <Heading>非営利利用</Heading>
            <p>非営利で利用する限り以下のことが許可されます。</p>
            <ol>
              <li>顔を複製したり、再配布できます。</li>
              <li>
                顔写真を加工したり、改変したり、別の作品の一部として使用することができます。
              </li>
            </ol>
          </section>

          <section>
            <Heading>営利利用</Heading>
            <p>
              営利目的で顔を利用の場合は顔の利用料が発生します。お問合せからご相談ください。
            </p>
            <p>特に相談がない場合は顔1点につき5000円で利用できます。</p>
          </section>
        </Hero>
      </Layout>
    );
  }
}

export default FacePage;
