import React from "react";
import "./popup.css";
import cookie from 'react-cookies';

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
    this.props.pfn(val)//这个地方把值传递给了props的事件当中
  }

  isShowSuccess() {
    this.setState({ isShow: false })
  }

  render() {
    return (
      <>
        <div className="popup" style={{ display: this.props.hidden ? "none" : "block" }}>
          <div className="popupContainer" style={{ display: this.state.isShow ? "block" : "none" }}>
            <div className="modalContent">
              <div className="topBar">
                <div className="titleRow">
                  <div className="iconBadge">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                      <polyline points="7 10 12 15 17 10"/>
                      <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                  </div>
                  <div className="popupTitleText">下载 TDengine</div>
                </div>
                <button className="closeBtn" onClick={this.closeBtn.bind(this, true)}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12"/>
                  </svg>
                </button>
              </div>
              <p className="popupContent">输入您的电子邮箱以接收下载链接</p>
              <SubScription pkg={this.props.productName} path={this.props.path} isShowSuccess={this.isShowSuccess.bind(this)} />
            </div>
          </div>
          <div className="successContainer" style={{ display: this.state.isShow ? "none" : "block" }}>
            <div className="successContent">
              <div className="successIcon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <h3 className="successTitle">发送成功</h3>
              <p className="successDesc">下载链接已发送到您的邮箱</p>
              <button className="btnPrimary" onClick={this.closeBtn.bind(this, true)}>关闭</button>
            </div>
          </div>
        </div>
      </>
    )
  }
}


// 订阅弹窗
class SubScription extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      email_value: cookie.load('email') ? cookie.load('email') : '',
      showMessageEmail: false,
      showMessageValidEmail: false,
      showMessageCheckbox: false,
      lang: 'cn',
      can_contact: true,
    }
  }
  download() {
    // clear all warning messages
    this.setState({
      showMessageCheckbox: false,
      showMessageEmail: false,
      showMessageValidEmail: false
    })

    // check whether checkbox selected
    if (!this.state.can_contact) {
      this.setState({ showMessageCheckbox: true });
      return false;
    }

    //check whether email entered and valid
    let email = this.state.email.value;
    this.state.email_value = email;
    if (email == "") {
      this.state.email.focus()
      this.setState({ showMessageEmail: true });
      return false;
    } else if (!validateEmail(email)) {
      this.state.email.focus()
      this.setState({ showMessageValidEmail: true });
      return false;
    }

    cookie.save('email', email, { domain: 'taosdata.com', path: "/", expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) });
    
    const pkgField = this.props.pkg || this.props.pkgName || this.props.productName || '';
    let postData = {
      "email": email,
      "pkg": pkgField,
      "lang": this.state.lang,
      "can_contact": this.state.can_contact,
      "path": this.props.path
    };
    console.log(postData);
    let formData = new FormData();
    for (let key in postData) {
      formData.append(key, postData[key])
    }

    fetch('https://docs.taosdata.com/assets/globalscripts//generatelink_v3_download_center.php', {
      method: 'post',
      body: formData,
      cache: 'no-cache'
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
  handleChange(event) {
    this.setState({
      lang: event.target.value
    })
  }
  handleCheckBox(event) {
    if (this.state.can_contact) {
      this.setState({ can_contact: false })
    } else {
      this.setState({ can_contact: true, showMessageCheckbox: false })
    }
  }

  render() {
    return (
      <>
        <div className="formField">
          <input ref={el => this.state.email = el} className="subscriptionInput" required type="email" placeholder="请输入您的邮箱地址" onChange={(event) => {
            const email = event.target.value;
            if (email) {
              this.setState({ showMessageEmail: false });
              if (validateEmail(email)) {
                this.setState({ showMessageValidEmail: false });
              }
            }
          }} />
          <p className="formRequired" style={{ display: this.state.showMessageEmail ? "block" : "none" }}>请输入电子邮箱</p>
          <p className="formRequired" style={{ display: this.state.showMessageValidEmail ? "block" : "none" }}>电子邮箱不正确</p>
        </div>

        <label className="checkboxWrapper">
          <input type='checkbox' className="checkboxInput" onChange={this.handleCheckBox.bind(this)} defaultChecked={this.state.can_contact} />
          <span className="checkboxCustom">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </span>
          <span className="checkboxLabel">同意涛思数据通过此邮箱联系我<span className="formRequired">*</span></span>
        </label>
        <p className="formRequired" style={{ display: this.state.showMessageCheckbox ? "block" : "none" }}>请勾选同意，便于我们通过邮件发送安装包给您。</p>
        
        <button className="btnPrimary" onClick={this.download.bind(this)} >立即下载</button>
      </>
    )
  }
}