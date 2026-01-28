import { useState } from "react";
import styles from "./styles.module.css";
import CloseSvg from "/img/close.svg";

export default function Popup(props) {
  const isValidEmail = (v) => /^\S+@\S+\.\S+$/.test(v);

  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [finished, setFinished] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [canContact, setCanContact] = useState(true);

  const submissionError = {
    firstName: !firstName.trim(),
    lastName: !lastName.trim(),
    email: !email.trim(),
    emailFormat: email.trim() && !isValidEmail(email.trim()),
    company: !company.trim(),
    checkbox: !canContact
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    setSubmitError("");

    if (Object.values(submissionError).some(Boolean)) return;

    try {
      await props.onSubmit({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        company: company.trim(),
        phone: phone.trim(),
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
            <div className={styles.closePopup}>
              <button className={styles.closePopupButton} onClick={props.onClose}>
                <CloseSvg alt="Close" />
              </button>
            </div>
            <div className={styles.popupTitleText}>Download TDengine</div>
          </div>
          <div className={styles.popupContentContainer}>
            <p className={styles.popupContent}>Enter your information to receive a download link.</p>
            <form onSubmit={handleSubmit} noValidate>
              <div className={styles.formColumns}>
                <div className={styles.formInputColumn}>
                  <label>First name<span className={styles.formRequired}>*</span></label>
                  <input className={styles.subscriptionInput} value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                  {submitted && submissionError.firstName && (
                    <p className={styles.formRequired}>Please complete this required field.</p>
                  )}
                </div>
                <div className={styles.formInputColumn}>
                  <label>Last name<span className={styles.formRequired}>*</span></label>
                  <input className={styles.subscriptionInput} value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                  {submitted && submissionError.lastName && (
                    <p className={styles.formRequired}>Please complete this required field.</p>
                  )}
                </div>
              </div>
              <div className={styles.formField}>
                <label>Email address<span className={styles.formRequired}>*</span></label>
                <input className={styles.subscriptionInput} value={email} onChange={(e) => setEmail(e.target.value)} required />
                {submitted && submissionError.email && (
                  <p className={styles.formRequired}>Please complete this required field.</p>
                )}
                {submitted && submissionError.emailFormat && (
                  <p className={styles.formRequired}>Email must be formatted correctly.</p>
                )}
              </div>
              <div className={styles.formField}>
                <label>Company<span className={styles.formRequired}>*</span></label>
                <input className={styles.subscriptionInput} value={company} onChange={(e) => setCompany(e.target.value)} required />
                {submitted && submissionError.company && (
                  <p className={styles.formRequired}>Please complete this required field.</p>
                )}
              </div>
              <div className={styles.formField}>
                <label>Mobile phone</label>
                <input className={styles.subscriptionInput} value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
              <div className={styles.popupCheckbox}>
                <input type="checkbox" checked={canContact} onChange={(e) => setCanContact(e.target.checked)} required />
                <label>I agree to receive communications from TDengine and allow TDengine to store &amp; process my personal data.<span className={styles.formRequired}>*</span></label>
                {submitted && submissionError.checkbox && (
                  <p className={styles.formRequired}>Please complete this required field.</p>
                )}
              </div>
              <div className={styles.buttonContainer}>
                <button className={styles.btnPrimary} type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className={styles.messageContainer}>
          <p className={styles.successMsg}>
            {!submitError ? ("A download link has been sent to your email address.") : ("Something went wrong. Please try again.")}
          </p>
          <div className={styles.buttonContainer}>
            <button className={styles.btnPrimary} onClick={props.onClose}>Close</button>
          </div>
        </div>
      )
      }
    </div >
  )
}