import React from "react";
import styles from "./styles.module.css";
import CloseSvg from "/img/close.svg";

function validateEmail(email) {
  var reg = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
  return reg.test(email);
}
export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isShow: true }
  }

  closeBtn(val) {
    this.setState({ isShow: true })
    this.props.pfn(val)
  }

  isShowSuccess() {
    this.setState({ isShow: false })
  }

  render() {
    return (
      <>
        <div className={styles.popup} style={{ display: this.props.hidden ? "none" : "block" }}>
          <div className={styles.popupContainer} style={{ display: this.state.isShow ? "block" : "none" }}>
            <div className={styles.popupTitle}>
              <figure className={styles.closePopup} onClick={this.closeBtn.bind(this, this.props.hidden)}>
                <CloseSvg alt="Close" />
              </figure>
              <div className={styles.popupTitleText}>Download TDengine</div>
            </div>
            <div className={styles.popupContentContainer}>
              <p className={styles.popupContent}>Enter your information to receive a download link.</p>
              <SubScription pkg={this.props.productName} path={this.props.path} isShowSuccess={this.isShowSuccess.bind(this)} tdVersion={this.props.tdVersion} />
            </div>
          </div>
          <div className={styles.messageContainer} style={{ display: this.state.isShow ? "none" : "block" }}>
            <p className={styles.successMsg}>A download link has been sent to your email address.</p>
            <div className={styles.buttonContainer}>
              <button className={styles.btnPrimary} onClick={this.closeBtn.bind(this, this.props.hidden)}>Close</button>
            </div>
          </div>
        </div>
      </>
    )
  }
}


// download popup
class SubScription extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      email_value: '',
      showMessageFirstName: false,
      showMessageLastName: false,
      showMessageEmail: false,
      showMessageValidEmail: false,
      showMessageCheckbox: false,
      lang: 'en',
      can_contact: true
    }
  }

  download() {
    // clear all warning messages
    this.setState({
      showMessageCheckbox: false,
      showMessageFirstName: false,
      showMessageLastName: false,
      showMessageEmail: false,
      showMessageValidEmail: false
    })

    // check whether checkbox selected
    if (!this.state.can_contact) {
      this.setState({ showMessageCheckbox: true });
    }

    //check whether first name entered
    let firstName = this.state.firstName.value;
    if (firstName == "") {
      this.state.firstName.focus()
      this.setState({ showMessageFirstName: true });
    }

    //check whether last name entered
    let lastName = this.state.lastName.value;
    if (lastName == "") {
      this.state.lastName.focus()
      this.setState({ showMessageLastName: true });
    }

    //check whether email entered and valid
    let email = this.state.email.value;
    this.state.email_value = email;
    if (email == "") {
      this.state.email.focus()
      this.setState({ showMessageEmail: true });
    } else if (!validateEmail(email)) {
      this.state.email.focus()
      this.setState({ showMessageValidEmail: true });
    }

    //fail if anything invalid
    if (this.state.showMessageCheckbox || this.state.showMessageFirstName || this.state.showMessageLastName || this.state.showMessageEmail || this.state.showMessageValidEmail) {
      return false;
    }

    // set link generation url based on version requested
    let downloadUrl = "https://docs.tdengine.com/assets/globalscripts/generatelink_v3_download_center.php";

    const pkgField = this.props.pkg || this.props.pkgName || this.props.productName || '';
    let postData = {
      'firstName': this.state.firstName.value,
      'lastName': this.state.lastName.value,
      "email": email,
      'phone': this.state.phone.value,
      'company': this.state.company.value,
      "lang": this.state.lang,
      "can_contact": this.state.can_contact,
      "pkg": pkgField,
      "path": this.props.path
    };
    console.log(postData);
    let formData = new FormData();
    for (let key in postData) {
      formData.append(key, postData[key])
    }
    fetch(downloadUrl, {
      method: 'post',
      body: formData
    }).then((response) => {
      return response.json()
    }).then((data) => {
      if (data[0].status == 'Success') {
        this.props.isShowSuccess();
      }
    }).catch(function (error) {
      console.log(error)
    })
  }

  handleCheckbox = (event) => {
    this.setState({ can_contact: event.target.checked });
  };

  render() {
    return (
      <>
        <div className={styles.formColumns}>
          <div className={styles.formInputColumn}>
            <label>First name<span className={styles.formRequired}>*</span></label>
            <input ref={el => this.state.firstName = el} className={styles.subscriptionInput} required />
            <p className={styles.formRequired} style={{ display: this.state.showMessageFirstName ? "block" : "none" }}>Please complete this required field.</p>
          </div>
          <div className={styles.formInputColumn}>
            <label>Last name<span className={styles.formRequired}>*</span></label>
            <input ref={el => this.state.lastName = el} className={styles.subscriptionInput} required />
            <p className={styles.formRequired} style={{ display: this.state.showMessageLastName ? "block" : "none" }}>Please complete this required field.</p>
          </div>
        </div>
        <div className={styles.formField}>
          <label>Email address<span className={styles.formRequired}>*</span></label>
          <input ref={el => this.state.email = el} className={styles.subscriptionInput} required type="email" />
          <p className={styles.formRequired} style={{ display: this.state.showMessageEmail ? "block" : "none" }}>Please complete this required field.</p>
          <p className={styles.formRequired} style={{ display: this.state.showMessageValidEmail ? "block" : "none" }}>Email must be formatted correctly.</p>
        </div>
        <div className={styles.formField}>
          <label>Mobile phone</label>
          <input ref={el => this.state.phone = el} className={styles.subscriptionInput} />
        </div>
        <div className={styles.formField}>
          <label>Company</label>
          <input ref={el => this.state.company = el} className={styles.subscriptionInput} />
        </div>
        <div className={styles.popupCheckbox}>
          <input checked={this.state.can_contact} onChange={this.handleCheckbox} type='checkbox' />
          <label>I agree to receive communications from TDengine and allow TDengine to store & process my personal data.<span className={styles.formRequired}>*</span>
            <p className={styles.formRequired} style={{ display: this.state.showMessageCheckbox ? "block" : "none" }}>Please complete this required field.</p></label>
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.btnPrimary} onClick={this.download.bind(this)} >Submit</button>
        </div>
      </>
    )
  }
}

