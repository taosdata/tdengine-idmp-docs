import React from "react";
import "./popup.css";
import cookie from 'react-cookies'
import CloseIcon from "/img/close.svg";

//邮箱正则验证
function validateEmail(email) {
  var reg = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
  return reg.test(email);
}
export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: true,
      sucessMsg: '',
    }
  }
  closeBtn(val) {
    this.setState({ isShow: true })
    this.props.pfn(val)//这个地方把值传递给了props的事件当中
  }
  isShowSuccess(sucessMsg) {
    this.setState({ isShow: false })
    this.setState({ sucessMsg: sucessMsg })
  }
  render() {
    return (
      <div className={this.props.hidden ? "popup popup-hidden" : "popup"}>
        <div className={"popup-container"}>
          <div className={this.state.isShow ? "display-is-block" : "display-is-none"} >
            <div className={"popup-title"}>
              <div className={"popup-title-text"}>
                下载 TDengine
              </div>
              <div className={"close-popup"} onClick={this.closeBtn.bind(this, this.props.hidden)} aria-label="关闭弹窗">
                <CloseIcon className="close-icon" />
              </div>
            </div>
            <div className={"popup-content"}>
              <SubScription
                pkg={this.props.productName}
                path={this.props.path}
                isShowSuccess={this.isShowSuccess.bind(this)}
              />
            </div>
          </div>
          <div className={this.state.isShow ? "display-is-none" : "display-is-block"}>
            <div style={{ diaplay: 'block', width: '90%', margin: '0 auto', padding: '1rem' }}>
              <div className="success-msg">{this.state.sucessMsg}</div>
              <button className="btn btn-primary" onClick={this.closeBtn.bind(this, this.props.hidden)}>关闭</button>
            </div>
          </div>
        </div>
      </div>
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
      message: '',
      showMessage: false,
      sucessMsg: "已成功把下载链接发送到您的邮箱，请查收。",
      lang: 'cn',
      can_contact: true,
      show_notice: false
    }
  }
  download() {
    console.log("this is props",this.props)
    if (!this.state.can_contact) {
      this.setState({ show_notice: true })
      return false;
    }
    this.setState({ show_notice: false })

    console.log(this.state.lang)
    let email = this.state.email.value
    this.state.email_value = email
    if (email == "") {
      this.state.email.focus()
      this.setState({ message: "请输入邮件地址" });
      this.setState({ showMessage: true });
      return false;
    } else if (!validateEmail(email)) {
      this.state.email.focus()
      this.setState({ message: "电子邮件不正确" });
      this.setState({ showMessage: true });
      return false;
    }
    const pkgField = this.props.pkg || this.props.pkgName || this.props.productName || '';
    let postData = {
      "email": email,
      "pkg": pkgField,
      "lang": this.state.lang,
      "can_contact": this.state.can_contact,
      "path": this.props.path
    }
    console.log(postData)
    console.log(this.state.can_contact)
    let formData = new FormData();
    for (let key in postData) {
      formData.append(key, postData[key])
    }
    this.props.isShowSuccess("邮件正在发送，请稍候...");

    fetch('https://docs.taosdata.com/assets/globalscripts//generatelink_v3_download_center.php', {
      method: 'post',
      body: formData,
      cache: 'no-cache'
    }).then((response) => {
      return response.json()
    }).then((data) => {
      if (data[0].status == 'Success') {
        this.props.isShowSuccess(this.state.sucessMsg);
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
    this.setState({ can_contact: !this.state.can_contact })
    this.setState({ show_notice: !this.state.show_notice })
  }
  render() {
    return (
      <div>
        <div style={{ diaplay: 'block', width: '90%', margin: '0 auto', position: 'relative' }}>
          <div className={this.state.showMessage ? "popalert" : "popalert popalert-hidden"}>
            {this.state.message}
          </div>
          <div style={{ height: '2.1rem' }}>输入您的电子邮箱以接收下载链接</div>
          <input ref={el => this.state.email = el} value={this.state.email_value} onChange={(event) => {
            this.setState({
              email_value: this.state.email.value
            })
          }} className="sub-scription-input" placeholder='请输入您的邮箱' required type="email" />
          {/* <div className="versionDropdownWrapper">
            <select className='versionSelect' onChange={this.handleChange.bind(this)}>
              <option key='cn' value='cn'>中文</option>
              <option key='en' value='en'>英文</option>
            </select>
          </div> */}
          <input type='checkbox' onChange={this.handleCheckBox.bind(this)} defaultChecked={this.state.can_contact} /> 同意涛思数据通过此邮件地址联系我
          <p style={{ display:this.state.show_notice?"block": "none", "font-size":"14px" }}>请勾选同意，便于我们通过邮件发送安装包给您。</p>
        <button className="btn btn-primary" onClick={this.download.bind(this)}>下载</button>
      </div>
      </div>
    )
  }
}

