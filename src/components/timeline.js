import React from "react"

import "./timeline.css"

const Timeline = () => (
  <div>
    <div class="columns">
      <div class="column is-2">
        <div class="timeline-date is-hidden-touch">
          <p>2010</p>
        </div>
      </div>
      <div class="column">
        <div class="timeline-content">
          <p class="sub">在上海日本国総領事館付属</p>
          <p class="main"><a target="_blank" href="http://www.srx2.net.cn/">上海日本人学校</a> 虹橋校</p>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column is-2">
        <div class="timeline-date is-hidden-touch">
          <p>2013</p>
        </div>
      </div>
      <div class="column">
        <div class="timeline-content">
          <p class="sub">神戸市立</p>
          <p class="main"><a target="_blank" href="http://www2.kobe-c.ed.jp/osb-ms/">押部谷中学校</a></p>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column is-2">
        <div class="timeline-date is-hidden-touch">
          <p>2018</p>
        </div>
      </div>
      <div class="column">
        <div class="timeline-content">
          <p class="sub">神戸市立</p>
          <p class="main"><a target="_blank" href="http://www.kobe-kosen.ac.jp/">工業高等専門学校</a> 電子工学科</p>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column is-2">
        <div class="timeline-date is-hidden-touch">
          <p class="main">2020</p>
        </div>
      </div>
      <div class="column">
        <div class="timeline-content">
          <p class="sub">国立</p>
          <p class="main"><a target="_blank" href="http://www.shinshu-u.ac.jp/">信州大学</a> 工学部 電子情報システム工学科</p>
        </div>
      </div>
    </div>
  </div>
)

export default Timeline
