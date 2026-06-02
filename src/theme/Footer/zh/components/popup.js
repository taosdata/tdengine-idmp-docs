import React from "react";
import "./popup.css"
import cookie from 'react-cookies'

const TS_LOG = "TS_LOG";

//邮箱正则验证
function validateEmail(email) {
    let reg = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
    return reg.test(email);
}

//手机号码正则验证
function validatePhone(phone) {
    let reg = /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/;
    return reg.test(phone);
}

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

function getTSLOG() {
    let str = getCookie(TS_LOG);
    if (str) {
        let cookieStr = decodeURIComponent(str);
        return cookieStr.split(",");
    }
    return null;
}

function getCookie(name) {
    let val = cookie.load(name);
    if (typeof val === "undefined") {
        val = null;
    }
    return val;
}

function getDomain(url) {
    let domain = url.split('/');
    if (domain[2]) {
        domain = domain[2];
    } else {
        domain = '';
    }
    return domain;
}

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: true,
            successMsg: '',
            flag: ''
        }
    }

    componentDidMount() {
        let referrer = document.referrer;
        let domain = getDomain(referrer);
        let monitorVal = [];
        if (domain.match(/taosdata.com/)) {
            monitorVal = getTSLOG();
            let url = window.location.href;
            if (monitorVal && monitorVal instanceof Array) {
                monitorVal.push(url);
            } else {
                monitorVal = [url];
            }
        } else {
            monitorVal = [referrer];
        }
        setCookie(TS_LOG, encodeURIComponent(monitorVal));
    }

    closeBtn(val) {
        this.setState({ isShow: true });
        this.props.pfn(val);//这个地方把值传递给了props的事件当中
    }

    isShowSuccess(successMsg, flag) {
        this.setState({ isShow: false });
        this.setState({ successMsg: successMsg });
        this.setState({ flag: flag });
    }

    render() {
        return (
            <div className={this.props.hidden ? "popup popup-hidden" : "popup"}>
                <div className={"popup-container"}>
                    <div className={this.state.isShow ? "display-is-block" : "display-is-none"}>
                        <div className={"popup-title"}>
                            <div className={"popup-title-text"}>
                                {this.props.data.title}
                            </div>
                            <div className={"close-popup"} onClick={this.closeBtn.bind(this, this.props.hidden)}>
                                <img src="/img/close.webp" alt="TDengine Database"></img>
                            </div>
                        </div>
                        <div className={"popup-content"}>
                            {this.props.data.src == 'weChat' ? <WeChat /> : null}
                            {this.props.data.src == 'technical' ? <TechnicalExchange /> : null}
                            {this.props.data.src == 'subScription' ? <SubScription isShowSuccess={this.isShowSuccess.bind(this)} /> : null}
                            {this.props.data.src == 'contactSales' ? <ContactSales isShowSuccess={this.isShowSuccess.bind(this)} /> : null}
                        </div>
                    </div>
                    <div className={this.state.isShow ? "display-is-none" : "display-is-block"}>
                        <div style={{ display: 'block', width: '90%', margin: '0 auto', padding: '1rem' }}>
                            <div className="success-img">
                                {this.state.flag == "sub" ? <img src="/img/subscribe-success.webp" alt="TDengine Database"></img> : ""}
                                {this.state.flag == "sale" ? <img src="/img/send-success.webp" alt="TDengine Database"></img> : ""}
                            </div>
                            <div className="success-msg">{this.state.successMsg}</div>
                            <button className="btn btn-primary" onClick={this.closeBtn.bind(this, this.props.hidden)}>关闭</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

// 微信二维码弹窗
class WeChat extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <img src="/img/tdengineqrcode_1.jpeg" alt="TDengine Database"></img>
        )
    }
}

// 技术交流二维码弹窗
class TechnicalExchange extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <span style={{ color: "#6a85bd" }}>技术交流群加小T为好友，即可加入物联网大数据技术前沿群</span>
                <img src="/img/tdengine-new.jpeg" alt="TDengine Database"></img>
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
            message: '',
            showMessage: false,
            successMsg: "恭喜您成功订阅 TDengine 最新动态",
            flag: 'sub'
        }
    }

    subscribe() {
        let email = this.state.email.value;
        let timer = setTimeout(() => {
            this.setState({ message: "" });
            this.setState({ showMessage: false });
            timer = null;
        }, 2000);
        if (email == "") {
            this.state.email.focus();
            this.setState({ message: "请输入邮件地址" });
            this.setState({ showMessage: true });
            return false;
        } else if (!validateEmail(email)) {
            this.state.email.focus();
            this.setState({ message: "电子邮件不正确" });
            this.setState({ showMessage: true });
            return false;
        }
        let postData = {
            "email": email
        };
        let formData = new FormData();
        for (let key in postData) {
            formData.append(key, postData[key]);
        }
        fetch('https://docs.taosdata.com/assets/globalscripts/subscribe.php', {
            method: 'post',
            body: formData
        }).then((response) => {
            return response.json();
        }).then((data) => {
            if (data[0].status == 'success') {
                this.props.isShowSuccess(this.state.successMsg, this.state.flag);
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    render() {
        return (
            <div>
                <div style={{ display: 'block', width: '90%', margin: '0 auto', position: 'relative' }}>
                    <div className={this.state.showMessage ? "popalert" : "popalert popalert-hidden"}>
                        {this.state.message}
                    </div>
                    <input ref={el => this.state.email = el} className="sub-scription-input" placeholder='请输入您的邮箱' required type="email" />
                    <button className="btn btn-primary" onClick={this.subscribe.bind(this)}>提交</button>
                </div>
            </div>
        )
    }
}

// 联系销售弹窗
class ContactSales extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            cmp: '',
            emailc: '',
            phone: '',
            cate: 1,
            msg: '',
            message: '',
            csrf_token: '',
            timestamp: 0,
            request_sign: 0,
            showMessage: false,
            successMsg: "我们将在最快时间内与您取得联系！",
            flag: 'sale'
        };
    }

    contactSales() {
        let catemap = { 1: "TDengine Enterprise", 5: "TDengine Cloud", 2: "渠道伙伴", 3: "集成 · 技术伙伴", 4: "OEM 伙伴" };
        let name = this.state.name.value;
        let cmp = this.state.cmp.value;
        let email = this.state.emailc.value;
        let msg = this.state.msg.value;
        let phone = this.state.phone.value;
        let cate = this.state.cate.value;
        let csrf_token = this.state.csrf_token.value;
        let timestamp = this.state.timestamp.value;
        let signature = this.state.request_sign.value;
        let category = catemap[cate];
        let timer1 = setTimeout(() => {
            this.setState({ message: "" });
            this.setState({ showMessage: false });
            timer1 = null;
        }, 2000);
        if (name == "") {
            console.log('name', name);
            this.state.name.focus();
            this.setState({ message: "请输入你的名字" });
            this.setState({ showMessage: true });
            return false;
        }
        if (cmp == "") {
            console.log('cmp', cmp);
            this.state.cmp.focus();
            this.setState({ message: "请输入公司名" });
            this.setState({ showMessage: true });
            return false;
        }
        if (email == "") {
            this.state.emailc.focus();
            this.setState({ message: "请输入邮件地址" });
            this.setState({ showMessage: true });
            return false;
        } else if (!validateEmail(email)) {
            this.state.emailc.focus();
            this.setState({ message: "电子邮件不正确" });
            this.setState({ showMessage: true });
            return false;
        }
        if (phone == "") {
            this.state.phone.focus();
            this.setState({ message: "请输入手机号码" });
            this.setState({ showMessage: true });
            return false;
        } else if (!validatePhone(phone)) {
            this.state.phone.focus();
            this.setState({ message: "手机号码不正确" });
            this.setState({ showMessage: true });
            return false;
        }
        if (msg == "") {
            this.state.msg.focus();
            this.setState({ message: "请留言" });
            this.setState({ showMessage: true });
            return false;
        }
        let current_url = window.location.href;
        let log_cookie = getTSLOG();
        if (!log_cookie) {
            log_cookie = [];
        }
        log_cookie.push(current_url);
        setCookie(TS_LOG, encodeURIComponent(log_cookie));
        let visit_log = getTSLOG();
        let visitFormData = new FormData();
        visitFormData.append('email', email);
        visitFormData.append('log', visit_log);
        fetch('https://docs.taosdata.com/assets/globalscripts/save-visit-log.php', {
            method: 'post',
            body: visitFormData
        }).then((response) => {
            return response.json();
        }).then((data) => {
        });
        setCookie(TS_LOG, null);

        // 导入微伴线索公海并发送群消息
        let json = { company: cmp, linkman: name, phone: phone, email: email, category: cate, message: msg };
        fetch('https://www.tdengine.com:9617/market/addLead', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(json)
        }).then((response) => {
            return response.json();
        }).then((data) => {
            console.log(data);
        });

        // 发送邮件等
        let message = '<h1>' + name + ' wishes to contact sales</h1>';
        message += '<p>Email: ' + email + '</p>';
        message += '<p>Phone: ' + phone + '</p>';
        message += '<p>Company: ' + cmp + '</p>';
        message += '<p>Category: ' + cate + '</p>';
        message += '<p>Message: ' + msg + '</p>';
        message += "<p>Visit urls: " + visit_log + "</p>";
        let postData = {
            from: 'support@taosdata.com',
            fromname: email,
            to: 'jhtao@taosdata.com',
            subject: '联系销售',
            message: message,
            category: cate,
            csrf_token: csrf_token,
            timestamp: timestamp,
            signature: signature,
            successmsg: "成功联系销售",
            errormsg: "抱歉，暂时联系不到销售"
        };
        let formData = new FormData();
        for (let key in postData) {
            formData.append(key, postData[key]);
        }
        fetch('https://docs.taosdata.com/assets/globalscripts/email.php', {
            method: 'post',
            body: formData
        }).then((response) => {
            return response.json();
        }).then((data) => {
            if (data[0].status == 'success') {
                this.props.isShowSuccess(this.state.successMsg, this.state.flag);
            }
        }).catch(function (error) {
            console.log(error);
        });
        setCookie("email", email, 365);
        setCookie('contact-sales', true, 365);
    }

    render() {
        if (!window.csrfToken) {
            window.csrfToken = Math.random().toString(36).substring(2) + Date.now().toString(36);
        }
        // 生成时间戳和签名
        const timestamp = Date.now();
        const sign = (timestamp % 18) + 6;
        return (
            <div style={{ position: 'relative' }}>
                <div className={this.state.showMessage ? "popalert" : "popalert popalert-hidden"}>
                    {this.state.message}
                </div>
                <span style={{ marginBottom: '0.5rem', display: 'block', color: '#6a85bd', fontSize: '16px' }}>请填写下面表单，我们的工作人员会与您联系。</span>
                <div>
                    <input ref={el => this.state.name = el} className="contract-sales name" placeholder='姓名' required />
                    <input ref={el => this.state.cmp = el} className="contract-sales company" placeholder='公司名' />
                    <input ref={el => this.state.emailc = el} className="contract-sales email" placeholder='邮箱' id='contact-sales-email-input' required />
                    <input ref={el => this.state.phone = el} className="contract-sales phone" placeholder='手机号' />
                    <select ref={el => this.state.cate = el} className="contract-sales cate">
                        <option defaultValue>TDengine Enterprise</option>
                        <option>TDengine Cloud</option>
                        <option>渠道伙伴</option>
                        <option>集成 · 技术伙伴</option>
                        <option>OEM 伙伴</option>
                    </select>
                    <textarea ref={el => this.state.msg = el} placeholder='留言...' className="message"></textarea>
                    <input type='hidden' id='csrf_token' value={csrfToken} />
                    <input type='hidden' id='timestamp' value={timestamp} />
                    <input type='hidden' id='request_sign' value={sign} />
                    <button className='btn btn-primary' onClick={this.contactSales.bind(this)}>
                        提交
                    </button>
                </div>
            </div>
        )
    }
}
