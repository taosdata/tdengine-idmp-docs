import React from 'react';
import styles from "./styles.module.css";
import GitHubIcon from "/img/github.svg";
import DiscordIcon from "/img/discord.svg";
import LinkedInIcon from "/img/linkedin.svg";
import TwitterIcon from "/img/twitter.svg";
import YouTubeIcon from "/img/youtube.svg";

function Footer() {

  return (
    <footer className={styles.footer}>
      <div className={styles.inside}>
        <div className={styles.top}>
          <div className={styles.left}>
            <div className={styles.imageContainer}>
              <a href="https://tdengine.com">
                <img className={styles.logoImg} width="150" height="30" src="/img/footer-logo.svg"
                  alt="TDengine" />
              </a>
              <div className={styles.certsContainer}>
                <a href="https://tdengine.com/legal/soc-2/">
                  <img className={styles.socImg} src="/img/soc-footer.png" alt="SOC 2 compliant" />
                </a>
                <a href="https://tdengine.com/legal/iso-27001/">
                  <img className={styles.isoImg} src="/img/iso27001-footer.png" alt="ISO 27001 compliant" />
                </a>
                <a href="https://tdengine.com/legal/iso-27001/">
                  <img className={styles.isoImg} src="/img/iso27017-footer.png" alt="ISO 27017 compliant" />
                </a>
              </div>
            </div>
            <p className={styles.footerBlurb}>TDengine® is an AI-powered data platform designed for industrial applications, combining the high-performance time-series database TDengine TSDB and the AI-native data management platform TDengine IDMP. With TDengine TSDB handling data ingestion, storage, and processing, and TDengine IDMP providing contextualization, standardization, and AI-powered analytics, TDengine enables industrial enterprises to unlock the true value of their time-series data.</p>
            <p className={styles.footerBlurb}>© 2022–2025 TDengine</p>
          </div>
          <div className={styles.right}>
            <div className={styles.firstColumn}>
              <div className={styles.firstTop}>
                <div className={styles.headline}>Products</div>
                <a href="https://tdengine.com/tsdb/">TDengine TSDB</a>
                <a href="https://tdengine.com/idmp/">TDengine IDMP</a>
                <a href="https://cloud.tdengine.com">TDengine Cloud</a>
              </div>
              <div className={styles.firstBottom}>
                <div className={styles.headline}>Resources</div>
                <a href="https://docs.tdengine.com/">TDengine TSDB Docs</a>
                <a href="https://idmpdocs.tdengine.com/">TDengine IDMP Docs</a>
                <a href="https://tdengine.com/blog/">Blog</a>
                <a href="https://tdengine.com/webinars/">Webinars</a>
              </div>
            </div>
            <div className={styles.secondColumn}>
              <div className={styles.headline}>Company</div>
              <a href="https://tdengine.com/about/">About</a>
              <a href="https://tdengine.com/downloads/">Downloads</a>
              <a href="https://tdengine.com/media/">Newsroom</a>
              <a href="https://tdengine.com/security/">Security</a>
              <a href="https://tdengine.com/legal/">Legal</a>
              <a href="https://tdengine.com/resellers/">Resellers</a>
              <a href="https://tdengine.com/partners/">Partners</a>
              <a href="https://tdengine.com/contact/">Contact Us</a>
            </div>
            <div className={styles.thirdColumn}>
              <div className={styles.headline}>Social</div>
              <a className={styles.socialBtn} href="https://github.com/taosdata/tdengine">
                <span className={styles.icon}>
                  <GitHubIcon />
                </span>
                <span>GitHub</span></a>
              <a className={styles.socialBtn} href="https://discord.com/invite/VZdSuUg4pS">
                <span className={styles.icon}>
                  <DiscordIcon />
                </span>
                <span>Discord</span></a>
              <a className={styles.socialBtn} href="https://www.linkedin.com/company/tdengine/">
                <span className={styles.icon}>
                  <LinkedInIcon />
                </span>
                <span>LinkedIn</span></a>
              <a className={styles.socialBtn} href="https://twitter.com/TDengineDB">
                <span className={styles.icon}>
                  <TwitterIcon />
                </span>
                <span>Twitter</span></a>
              <a className={styles.socialBtn} href="https://www.youtube.com/@tdengine">
                <span className={styles.icon}>
                  <YouTubeIcon />
                </span>
                <span>YouTube</span></a>
              <a className={styles.langIcon} href="https://www.taosdata.com/">中</a>
            </div>
          </div>
        </div>
      </div>
    </footer>

  );
}
export default React.memo(Footer);
