import React from "react";
import styles from "./styles.module.css";
import LogoSvg from "/img/site-logo.svg";
import Popup from "./components/popup";
import cookie from 'react-cookies'

function setCookie(name, value, daysToLive) {
  // var cookie = name + "=" + encodeURIComponent(value)+"; path=/";

  if (!value || typeof value === "undefined") {
    cookie.remove(name, { domain: 'taosdata.com', path: "/" });
    return;
    // cookie += "; max-age=" + 1;
  }
  let date = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
  if (typeof daysToLive === "number") {
    date = new Date(Date.now() + daysToLive * 24 * 60 * 60 * 1000);
    // cookie += "; max-age=" + (daysToLive * 24 * 60 * 60);
  }
  cookie.save(name, value, { domain: 'taosdata.com', path: "/", expires: date });
}


function getCookie(name) {
  let val = cookie.load(name);
  if (typeof val === "undefined") {
    val = null;
  }
  return val;
}
class TopLeft extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      m1: false,
      data: {
        title: '',
        str: ''
      }
    }
  }
  openWechatImg() {
    let data = {
      title: "微信公众号",
      src: "weChat",
    }
    this.setState({ m1: !this.state.m1 });
    this.setState({ data: data });
  }
  technicalExchange() {
    let data = {
      title: "技术交流群",
      src: "technical",
    }
    this.setState({ m1: !this.state.m1 });
    this.setState({ data: data });
  }
  render() {
    return (
      <div className={styles.left}>
        <div className={styles.imageContainer}>
          <figure className={styles.logo}>
            <a href="https://taosdata.com"><LogoSvg className={styles.logoImg} width="150" height="30" alt="TDengine" /></a>
          </figure>
          <div className={styles.certsContainer}>
            <figure className={styles.socFig}><a href="https://www.taosdata.com/tdengine/tdengine-cloud-soc-2"><img
              className={styles.socImg}
              src="/img/soc-footer.png"
              alt="SOC 2 Certified" /></a></figure>
            <figure className={styles.isoFig}><a href="https://www.taosdata.com/tdengine/iso-ice-27001-iso-ice-27017-certified"><img
              className={styles.isoImg}
              src="/img/iso27001-footer.png"
              alt="ISO 27001 Certified" /></a></figure>
            <figure className={styles.isoFig}><a href="https://www.taosdata.com/tdengine/iso-ice-27001-iso-ice-27017-certified"><img
              className={styles.isoImg}
              src="/img/iso27017-footer.png"
              alt="ISO 27017 Certified" /></a></figure>
          </div>
        </div>
        <div className={styles.tdengine}>
          TDengine 专为物联网IoT平台、工业大数据平台设计。其中，TDengine TSDB 是一款高性能、分布式的时序数据库（Time Series Database），同时它还带有内建的缓存、流式计算、数据订阅等系统功能；TDengine IDMP 是一款AI原生工业数据管理平台，它通过树状层次结构建立数据目录，对数据进行标准化、情景化，并通过 AI 提供实时分析、可视化、事件管理与报警等功能。
        </div>
        <div className={styles.social}>
          {/* weixin */}
          <span className={`${styles.socialBtn} ${styles.wechat}`} onClick={this.openWechatImg.bind(this)}>
            <span className={styles.icon}> <svg alt="TDengine Database" role="img" viewBox="0 0 576 512" height="30" width="30" xmlns="http://www.w3.org/2000/svg" > <path d="M385.2 167.6c6.4 0 12.6.3 18.8 1.1C387.4 90.3 303.3 32 207.7 32 100.5 32 13 104.8 13 197.4c0 53.4 29.3 97.5 77.9 131.6l-19.3 58.6 68-34.1c24.4 4.8 43.8 9.7 68.2 9.7 6.2 0 12.1-.3 18.3-.8-4-12.9-6.2-26.6-6.2-40.8-.1-84.9 72.9-154 165.3-154zm-104.5-52.9c14.5 0 24.2 9.7 24.2 24.4 0 14.5-9.7 24.2-24.2 24.2-14.8 0-29.3-9.7-29.3-24.2.1-14.7 14.6-24.4 29.3-24.4zm-136.4 48.6c-14.5 0-29.3-9.7-29.3-24.2 0-14.8 14.8-24.4 29.3-24.4 14.8 0 24.4 9.7 24.4 24.4 0 14.6-9.6 24.2-24.4 24.2zM563 319.4c0-77.9-77.9-141.3-165.4-141.3-92.7 0-165.4 63.4-165.4 141.3S305 460.7 397.6 460.7c19.3 0 38.9-5.1 58.6-9.9l53.4 29.3-14.8-48.6C534 402.1 563 363.2 563 319.4zm-219.1-24.5c-9.7 0-19.3-9.7-19.3-19.6 0-9.7 9.7-19.3 19.3-19.3 14.8 0 24.4 9.7 24.4 19.3 0 10-9.7 19.6-24.4 19.6zm107.1 0c-9.7 0-19.3-9.7-19.3-19.6 0-9.7 9.7-19.3 19.3-19.3 14.5 0 24.4 9.7 24.4 19.3.1 10-9.9 19.6-24.4 19.6z" fill="var(--white)" ></path> </svg> </span>
            <div className={styles.wechatSocialImg}>
              <div className={styles.indexModuleTooltipInner}>
                <img src={require("/img/tdengineqrcode_1.jpeg").default} alt="TDengine Database 公众号"></img>
                <div>
                  <p>添加公众号：</p>
                  <p>TDengine</p>
                </div>
              </div>
            </div>
          </span>

          {/* weibo */}
          <a className={styles.socialBtn} href="https://weibo.com/u/6368262736" target="_blank" rel="noopener noreferrer" aria-label="twitter link" > <span className={styles.icon}> <svg alt="TDengine Database" role="img" viewBox="0 0 512 512" height="20" width="20" xmlns="http://www.w3.org/2000/svg" > <path d="M407 177.6c7.6-24-13.4-46.8-37.4-41.7-22 4.8-28.8-28.1-7.1-32.8 50.1-10.9 92.3 37.1 76.5 84.8-6.8 21.2-38.8 10.8-32-10.3zM214.8 446.7C108.5 446.7 0 395.3 0 310.4c0-44.3 28-95.4 76.3-143.7C176 67 279.5 65.8 249.9 161c-4 13.1 12.3 5.7 12.3 6 79.5-33.6 140.5-16.8 114 51.4-3.7 9.4 1.1 10.9 8.3 13.1 135.7 42.3 34.8 215.2-169.7 215.2zm143.7-146.3c-5.4-55.7-78.5-94-163.4-85.7-84.8 8.6-148.8 60.3-143.4 116s78.5 94 163.4 85.7c84.8-8.6 148.8-60.3 143.4-116zM347.9 35.1c-25.9 5.6-16.8 43.7 8.3 38.3 72.3-15.2 134.8 52.8 111.7 124-7.4 24.2 29.1 37 37.4 12 31.9-99.8-55.1-195.9-157.4-174.3zm-78.5 311c-17.1 38.8-66.8 60-109.1 46.3-40.8-13.1-58-53.4-40.3-89.7 17.7-35.4 63.1-55.4 103.4-45.1 42 10.8 63.1 50.2 46 88.5zm-86.3-30c-12.9-5.4-30 .3-38 12.9-8.3 12.9-4.3 28 8.6 34 13.1 6 30.8.3 39.1-12.9 8-13.1 3.7-28.3-9.7-34zm32.6-13.4c-5.1-1.7-11.4.6-14.3 5.4-2.9 5.1-1.4 10.6 3.7 12.9 5.1 2 11.7-.3 14.6-5.4 2.8-5.2 1.1-10.9-4-12.9z" fill="var(--white)" ></path> </svg> </span> </a>

          <a className={styles.socialBtn} href="https://github.com/taosdata/TDengine" target="_blank" rel="noopener noreferrer" aria-label="facebook link"><span className={styles.icon}><svg alt="TDengine Database" role="img" viewBox="0 0 512 512" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M256 32C132.3 32 32 134.9 32 261.7c0 101.5 64.2 187.5 153.2 217.9 1.4.3 2.6.4 3.8.4 8.3 0 11.5-6.1 11.5-11.4 0-5.5-.2-19.9-.3-39.1-8.4 1.9-15.9 2.7-22.6 2.7-43.1 0-52.9-33.5-52.9-33.5-10.2-26.5-24.9-33.6-24.9-33.6-19.5-13.7-.1-14.1 1.4-14.1h.1c22.5 2 34.3 23.8 34.3 23.8 11.2 19.6 26.2 25.1 39.6 25.1 10.5 0 20-3.4 25.6-6 2-14.8 7.8-24.9 14.2-30.7-49.7-5.8-102-25.5-102-113.5 0-25.1 8.7-45.6 23-61.6-2.3-5.8-10-29.2 2.2-60.8 0 0 1.6-.5 5-.5 8.1 0 26.4 3.1 56.6 24.1 17.9-5.1 37-7.6 56.1-7.7 19 .1 38.2 2.6 56.1 7.7 30.2-21 48.5-24.1 56.6-24.1 3.4 0 5 .5 5 .5 12.2 31.6 4.5 55 2.2 60.8 14.3 16.1 23 36.6 23 61.6 0 88.2-52.4 107.6-102.3 113.3 8 7.1 15.2 21.1 15.2 42.5 0 30.7-.3 55.5-.3 63 0 5.4 3.1 11.5 11.4 11.5 1.2 0 2.6-.1 4-.4C415.9 449.2 480 363.1 480 261.7 480 134.9 379.7 32 256 32z"></path></svg></span></a>

          <span className={`${styles.socialBtn} ${styles.wechat}`} target="_blank" rel="noopener noreferrer" aria-label="twitter link" onClick={this.technicalExchange.bind(this)}>
            <span className={styles.icon}><svg alt="TDengine Database" role="img" height="20" width="20" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1291 1024" ><path fill="#ffffff" d="M781.793876 523.871639a229.106808 229.106808 0 0 0 88.712761-185.157367v-8.138785a230.327626 230.327626 0 0 0-225.444355-225.444355 230.327626 230.327626 0 0 0-225.851294 225.037416 240.908047 240.908047 0 0 0 88.712761 185.157367A348.746953 348.746953 0 0 0 282.479394 854.713264c8.138785 162.775707 153.009165 169.286736 354.444103 169.286736s354.444103 0 362.582888-169.286736c17.905328-145.684258-88.71276-274.684006-217.712509-330.841625z"></path><path fill="#ffffff" d="M403.340357 507.594069a290.554638 290.554638 0 0 1-48.425773-162.775708 284.857488 284.857488 0 0 1 81.387853-209.573723 228.29293 228.29293 0 0 1 88.712761-64.296404A203.469634 203.469634 0 0 0 363.053369 0.140801a225.037415 225.037415 0 0 0-225.444355 225.444355 240.908047 240.908047 0 0 0 88.712761 185.157367A356.478799 356.478799 0 0 0 0.063542 749.315994c8.138785 122.08178 96.851546 153.009165 225.444354 169.286736 0-16.277571-8.138785-32.148202-8.138785-48.425773a438.680531 438.680531 0 0 1 185.157367-362.582888z m660.462432-96.851546a229.106808 229.106808 0 0 0 88.712761-185.157367A220.154144 220.154144 0 0 0 926.664256 0.140801a203.469634 203.469634 0 0 0-162.775708 72.43519 304.390573 304.390573 0 0 1 177.018582 265.731342v8.138785A317.00569 317.00569 0 0 1 895.329932 515.732854a410.194782 410.194782 0 0 1 185.157367 362.582888 102.141756 102.141756 0 0 1-8.138785 48.425773c128.999748-8.138785 209.573723-40.693927 217.305569-169.286736a352.002467 352.002467 0 0 0-225.444355-346.305317z"></path></svg>
            </span>
            <div className={styles.wechatSocialImg}>
              <div className={styles.indexModuleTooltipInner}>
                <img src={require("/img/tdengine-new.jpeg").default} alt="TDengine Database 技术交流群"></img>
                <div>
                  <p>加小T为好友，即可加入物联网大数据技术前沿群</p>
                </div>
              </div>
            </div>
          </span>
          <a className={styles.socialBtn} href="https://www.linkedin.com/company/tdengine" target="_blank" rel="noopener noreferrer" aria-label="twitter link"><span className={styles.icon}><svg aria-hidden="true" alt="TDengine Database" role="img" height="1em" width="1em" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path></svg></span></a>
          <a className={styles.socialBtn} href="https://stackoverflow.com/questions/tagged/td-engine" target="_blank" rel="noopener noreferrer" aria-label="twitter link"><span className={styles.icon}><svg height="200" width="200" alt="TDengine Database" role="img" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024" ><path fill="#ffffff" d="M1024 640v384H0V640h128v256h768v-256zM192 704h640v128H192z m15.136-138.528l27.712-124.96 624.832 138.496-27.712 124.96z m72.512-256.928l54.08-116 580.032 270.464-54.08 116z m712.064 52.928l-77.92 101.536L406.048 73.408 462.4 0h58.24z"></path></svg></span></a>
          <a className={styles.socialBtn} href="https://www.zhihu.com/people/tbase" target="_blank" rel="noopener noreferrer" aria-label="twitter link"><span className={styles.icon}><svg height="200" width="200" alt="TDengine Database" role="img" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024"><path fill="#ffffff" d="M564.7 230.1V803h60l25.2 71.4L756.3 803h131.5V230.1H564.7z m247.7 497h-59.9l-75.1 50.4-17.8-50.4h-18V308.3h170.7v418.8zM526.1 486.9H393.3c2.1-44.9 4.3-104.3 6.6-172.9h130.9l-0.1-8.1c0-0.6-0.2-14.7-2.3-29.1-2.1-15-6.6-34.9-21-34.9H287.8c4.4-20.6 15.7-69.7 29.4-93.8l6.4-11.2-12.9-0.7c-0.8 0-19.6-0.9-41.4 10.6-35.7 19-51.7 56.4-58.7 84.4-18.4 73.1-44.6 123.9-55.7 145.6-3.3 6.4-5.3 10.2-6.2 12.8-1.8 4.9-0.8 9.8 2.8 13 10.5 9.5 38.2-2.9 38.5-3 0.6-0.3 1.3-0.6 2.2-1 13.9-6.3 55.1-25 69.8-84.5h56.7c0.7 32.2 3.1 138.4 2.9 172.9h-141l-2.1 1.5c-23.1 16.9-30.5 63.2-30.8 65.2l-1.4 9.2h167c-12.3 78.3-26.5 113.4-34 127.4-3.7 7-7.3 14-10.7 20.8-21.3 42.2-43.4 85.8-126.3 153.6-3.6 2.8-7 8-4.8 13.7 2.4 6.3 9.3 9.1 24.6 9.1 5.4 0 11.8-0.3 19.4-1 49.9-4.4 100.8-18 135.1-87.6 17-35.1 31.7-71.7 43.9-108.9L497 850l5-12c0.8-1.9 19-46.3 5.1-95.9l-0.5-1.8-108.1-123-22 16.6c6.4-26.1 10.6-49.9 12.5-71.1h158.7v-8c0-40.1-18.5-63.9-19.2-64.9l-2.4-3z"></path></svg></span></a>
        </div>

      </div>
    )
  }
}
class TopRight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      m1: false,
      data: {
        title: '',
        str: ''
      }
    }
  }
  fn(data) {
    this.setState({
      m1: data //把父组件中的parentText替换为子组件传递的值
    }, () => {
      console.log(this.state.m1);//setState是异步操作，但是我们可以在它的回调函数里面进行操作
    });
  }
  openSubScript() {
    window.open("https://www.taosdata.com/news-letter", "_self")
  }
  contactSales() {
    let data = {
      title: "联系 TDengine",
      src: "contactSales"
    }
    this.setState({ m1: !this.state.m1 });
    this.setState({ data: data });
  }
  // 探迹集客，显示聊天窗口
  // showTjjk() {
  //   TUNGEE_IM.run('show', {
  //     // offlineMessage: true
  //   })
  // }
  render() {
    return (
      <div className={styles.right}>
        <div className={styles.rightContainer}>
          <div className={styles.rightWrap}>
            <div className={styles.column}>
              <div className="gb-container">
                <div className="gb-container">
                  <div className={styles.headline}>产品</div>
                  <div className={styles.marginTop10}>
                    <div className={styles.headlineText}><a href="https://www.taosdata.com/tsdb">TDengine TSDB</a></div>
                    <div className={styles.headlineText}><a href="https://www.taosdata.com/idmp">TDengine IDMP</a></div>
                    <div className={styles.headlineText}><a href="https://cloud.taosdata.com/">TDengine Cloud</a></div>
                  </div>
                </div>
                <div className={styles.paddingTop20}>
                  <div className={styles.headlineText}>学习</div>
                  <div className="gb-container">
                    <div className={styles.headlineText}><a href="https://docs.taosdata.com/">TSDB 文档</a></div>
                    <div className={styles.headlineText}><a href="https://idmpdocs.taosdata.com/">IDMP 文档</a></div>
                    <div className={styles.headlineText}><a href="https://www.taosdata.com/blog">博客</a></div>
                    <div className={styles.headlineText}><a href="https://www.taosdata.com/tdengine-resources">资源</a></div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.column}><div className="gb-container">
              <div className="gb-container">
                <div className={styles.headlineText}>公司</div>
                <div className={styles.marginTop10}>
                  <div className={styles.headlineText}><a href="https://www.taosdata.com/about-tdengine">关于我们</a></div>
                  <div className={styles.headlineText}><a href="https://www.taosdata.com/support">技术支持</a></div>
                  <div className={styles.headlineText}><a href="https://www.taosdata.com/media">新闻动态</a></div>
                  <div className={styles.headlineText}><a href="https://www.taosdata.com/security-at-tdengine">安全性</a></div>
                  <div className={styles.headlineText}><a href="https://www.taosdata.com/contactus">联系我们</a></div>
                  <div className={styles.headlineText}><a href="https://www.taosdata.com/careers">招贤纳士</a></div>
                  <div className={styles.headlineText}><a href="https://www.taosdata.com/terms-of-service">服务条款</a></div>
                  <div className={styles.headlineText}><a href="https://www.taosdata.com/privacy">隐私</a></div>
                </div>
              </div>
            </div>
            </div>

            <div className={styles.column}>
              <div className="gb-container">
                <div className="gb-container">
                  <div className={styles.headlineText}>场景</div>
                  <div className={styles.marginTop10}>
                    <div className={styles.headlineText}><a href="https://www.taosdata.com/iot_time-series_database">物联网</a></div>
                    <div className={styles.headlineText}><a href="https://www.taosdata.com/iiot-time_series_database">工业互联网</a></div>
                    <div className={styles.headlineText}><a href="https://www.taosdata.com/iov-time_series_database">车联网</a></div>
                    <div className={styles.headlineText}><a href="https://www.taosdata.com/it_operation_time-series_database">IT 运维</a></div>
                    <div className={styles.headlineText}><a href="https://www.taosdata.com/energy">电力能源</a></div>
                    <div className={styles.headlineText}><a href="https://www.taosdata.com/finance">金融</a></div>
                  </div>
                  <div style={{ paddingTop: '10px' }}>
                    <a className={styles.gbButton} href="https://tdengine.com/" rel="nofollow">EN</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className={styles.sales}>
          <span onClick={this.openSubScript.bind(this)} className={styles.subScript}>
            <span>
              <svg aria-hidden="true" alt="TDengine Database"
                role="img" height="1em" width="1em" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor"
                  d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z">
                </path>
              </svg>
            </span>
            <span>订阅</span>
          </span>
          <span className={styles.button} onClick={this.contactSales.bind(this)}>联系销售</span>
        </div> */}
        <Popup hidden={!this.state.m1} data={this.state.data} pfn={this.fn.bind(this)} >
        </Popup>
        <div className={styles.quickLink}>
          {/*<div className={styles.fixTjjk} id="bd-tjjk-btn">
            <img decoding="async" src="/img/fixlogo4.png" data-src="/img/fixlogo4.png"/>
            <div className={styles.tipRight}>
              <div className={styles.rightTitle}><a onClick={this.showTjjk.bind(this)}>点击联系客服</a></div>
            </div>
          </div>
          <script src="https://inbound.tungee.com/im/bundle.js?deployId=65a78934bd591762738300b4" name="TGTouchCS"></script>*/}
          
          <div className={styles.fixAichat} id="bd-aichat-btn">
            <img decoding="async" src="/img/aichat.png" alt="TDengine AI Chat" />
            <div className={styles.tipRight}>
              <div className={styles.rightTitle}>
                <a href="https://chat.taosdata.com" target="_blank" rel="noopener noreferrer">
                  点击使用 AI 问答
                </a>
              </div>
              <div style={{ color: "#333844" }}>TDengine 的智能助手</div>
            </div>
          </div>

          <div className={styles.fixWechat} id="bd-wechat-btn">
            <img decoding="async" className={styles.wechatLogo} src="/img/fixlogo2.png" />
            <div className={styles.tipRight}>
              <img decoding="async" style={{ width: "100%" }} alt="TDengine Database" src="/img/tdengine-new.jpeg" className="" />
              <div>加小 T 为好友</div>
              <div style={{ color: "#333844" }}>即可加入物联网大数据技术前沿群</div>
            </div>
          </div>
          <div className={styles.fixPhone} id="bd-phone-btn">
            <img decoding="async" src="/img/phone.svg" data-src="/img/phone.svg" />
            <div className={styles.tipRight}>
              <div className={styles.rightTitle}><a href="tel:4006120020">联系销售</a></div>
              <div><a style={{ color: "#333844" }} href="tel:4006120020">4006120020</a></div>
            </div>
          </div>
          <div className={styles.fixForm} id="bd-contact-btn">
            <img decoding="async" src="/img/fixlogo1.png" data-src="/img/fixlogo1.png" className="" />
            <div className={styles.tipRight}>
              <div className={styles.rightTitle}><a onClick={this.contactSales.bind(this)} className="advice">点击填写表单</a></div>
              <div style={{ color: "#333844" }}>获得解决方案专家帮助</div>
            </div>
          </div>
          <div className="fix-github" id="bd-github-btn">
            <img decoding="async" className="wechat-logo" src="/img/fixlogo3.png" data-src="/img/fixlogo3.png" />
            <div className={styles.tipRight}>
              <div className={styles.rightTitle}><a href="https://github.com/taosdata/TDengine">点击前往 GitHub</a></div>
              <div><a style={{ color: "#333844" }} href="https://github.com/taosdata/TDengine">查看源代码</a></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const BottomLeft = () => (
  <div className={styles.bottomLeft}>
    <div>© 2017-2025 涛思数据</div>
    <div> 京公网安备 11010502047618号</div>
    <div><a href="https://beian.miit.gov.cn/" target="_blank">京ICP备17069529号-1</a></div>
    <div>AI 原生的工业数据管理平台 TDengine IDMP</div>
  </div>
);

class BottomRight extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className={styles.bottomRight}>
        <a className={styles.bottomLink} href="https://taosdata.com/careers">招贤纳士</a>
        <a className={styles.bottomLink} href="https://taosdata.com/terms-of-service">服务条款</a>
        <a className={styles.bottomLink} href="https://taosdata.com/privacy">隐私</a>
        <a className={styles.bottomLinkLast} href="https://taosdata.com/about">关于</a>
      </div>
    );
  }
}

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuShow: false
    }
    this.ChildRef = React.createRef();
  }
  componentDidMount() {
    let config = {
      attributes: true, //目标节点的属性变化
      childList: false, //目标节点的子节点的新增和删除
      characterData: false, //如果目标节点为characterData节点(一种抽象接口,具体可以为文本节点,注释节点,以及处理指令节点)时,也要观察该节点的文本内容是否发生变化
      subtree: false, //目标节点所有后代节点的attributes、childList、characterData变化
    };
    let body = document.querySelector("body");
    let nav = document.querySelector("body #__docusaurus nav");
    const mutationCallback = (mutationsList) => {
      for (let mutation of mutationsList) {
        let type = mutation.type;
        switch (type) {
          case "childList":
            console.log("A child node has been added or removed.");
            break;
          case "attributes":
            if (body.style.overflow == "visible") { //如果导航页面隐藏，浮标变为三横线
              this.setState({
                menuShow: false
              })
            } else if (body.className == "navigation-with-keyboard") { //监测是否点击页面跳转
              body.setAttribute("style", "overflow: visible;")
              nav.setAttribute("class", "navbar navbar--fixed-top")
              this.setState({
                menuShow: false
              })
            } else if (body.style.overflow == "hidden" && nav.className.indexOf("navbar-sidebar--show") != -1) {
              this.setState({
                menuShow: true
              })
            }
            break;
          case "subtree":
            console.log(`The subtree was modified.`);
            break;
          default:
            break;
        }
      }
    };
    let observe = new MutationObserver(mutationCallback);
    observe.observe(body, config);

    let email = getCookie("email");
    let hasContact = getCookie("contact-sales");
    if (email && hasContact) {

      let syncForm = new FormData();
      syncForm.append("email", email);
      syncForm.append("url", window.location.href);
      fetch('https://docs.taosdata.com/assets/globalscripts/sync2Jira.php', {
        method: 'post',
        body: syncForm
      }).then((response) => {
        return response.json()
      }).then((data) => {
        console.log("sync2Jira success");
      }).catch(function (error) {
        console.log(error)
      })
      setCookie('contact-sales', true, 365);
      setCookie('email', getCookie('email'), 365);
    }
  }
  closeMenuList() {
    let body = document.querySelector("body");
    body.setAttribute("style", "overflow: visible;")
    let nav = document.querySelector("body #__docusaurus nav");
    nav.setAttribute("class", "navbar navbar--fixed-top")
    this.setState({
      menuShow: false
    })
  }
  changeMenuList() {
    let body = document.querySelector("body");
    body.setAttribute("style", "overflow: hidden;")
    let nav = document.querySelector("body #__docusaurus nav");
    nav.setAttribute("class", "navbar navbar--fixed-top navbar-sidebar--show")
    this.setState({
      menuShow: true
    })
  }
  render() {
    return (
      <div>
        <div>
          {this.state.menuShow ? <div id={styles.menuShow} onClick={this.closeMenuList.bind(this)} >
            X
          </div> : <div id={styles.menuShow} onClick={this.changeMenuList.bind(this)} >
            <svg alt="TDengine Database" role="img" width="30" height="30" viewBox="0 0 30 30" aria-hidden="true">
              <path stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" d="M4 7h22M4 15h22M4 23h22">
              </path>
            </svg>
          </div>}
        </div>
        <div className={styles.footer}>
          <div className={styles.container}>
            <div className={styles.inside}>
              <div className={styles.top}>
                <TopLeft />
                <TopRight />
              </div>
              <div className={styles.bottom}>
                <BottomLeft />
                {/* <BottomRight /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
