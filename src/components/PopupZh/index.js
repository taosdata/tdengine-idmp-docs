import { useState } from "react";
import styles from "./styles.module.css";
import CloseSvg from "/img/close.svg";

export default function Popup(props) {
  const isValidEmail = (v) => /^\S+@\S+\.\S+$/.test(v);

  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [finished, setFinished] = useState(false);

  const [email, setEmail] = useState("");
  const [canContact, setCanContact] = useState(true);

  const submissionError = {
    email: !email.trim(),
    emailFormat: email.trim() && !isValidEmail(email.trim()),
    checkbox: !canContact
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    setSubmitError("");

    if (Object.values(submissionError).some(Boolean)) return;

    try {
      await props.onSubmit({
        email: email.trim()
      });
    } catch (err) {
      setSubmitError(
        err?.message || "Something went wrong. Please try again."
      );
    } finally {
      setFinished(true);
    }
  };

  return (
    <div className={styles.popup}>
      {!finished ? (
        <div className={styles.popupContainer}>
          <div className={styles.popupTitle}>
            <div className={styles.titleRow}>
              <div className={styles.iconBadge}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </div>
              <div className={styles.popupTitleText}>下载 TDengine</div>
            </div>
            <button className={styles.closeBtn} onClick={props.onClose}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className={styles.popupContentContainer}>
            <p className={styles.popupContent}>输入您的电子邮箱以接收下载链接</p>
            <form onSubmit={handleSubmit} noValidate>
              <div className={styles.formField}>
                <input className={styles.subscriptionInput} value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="请输入您的邮箱地址" />
                {submitted && submissionError.email && (
                  <p className={styles.formRequired}>请输入电子邮箱</p>
                )}
                {submitted && submissionError.emailFormat && (
                  <p className={styles.formRequired}>电子邮箱不正确</p>
                )}
              </div>
              <label className={styles.checkboxWrapper}>
                <input type='checkbox' className={styles.checkboxInput} checked={canContact} onChange={(e) => setCanContact(e.target.checked)} required />
                <span className={styles.checkboxCustom}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span className={styles.checkboxLabel}>同意涛思数据通过此邮箱联系我<span className={styles.formRequired}>*</span></span>
              </label>
              {submitted && submissionError.checkbox && (
                <p className={styles.formRequired}>请勾选同意，便于我们通过邮件发送安装包给您。</p>
              )}
              <button className={styles.btnPrimary} type="submit">立即下载</button>
            </form>
          </div>
        </div>
      ) : (
        <div className={styles.messageContainer}>
          <div className={styles.successContent}>
            <div className={styles.successIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h3 className={styles.successTitle}>发送成功</h3>
            <p className={styles.successDesc}>下载链接已发送到您的邮箱</p>
            <button className={styles.btnPrimary} onClick={props.onClose}>关闭</button>
          </div>
        </div>
      )
      }
    </div>
  )
}