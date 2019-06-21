import {showToast} from 'COMPONENT/messenger';
import ITserviceSvg from 'ASSET/imgs/ITservice.svg';

function downloadQiyuScript (w, d, n, a, j) {
    w[n] = w[n] || function () {
        return (w[n].a = w[n].a || []).push(arguments)
    };
    j = d.createElement('script');
    j.setAttribute('id','qiyukf')
    j.async = true;
    //expired at 2019-05-12
    j.src = 'https://qiyukf.com/script/fef2e62a55817280e458b21edc3fc4b6.js?hidden=1';
    if(process.env.BUILD_ENV === 'PRD'){
        j.src = 'https://qiyukf.com/script/8ce367faf9cc78d97fac7a47cb4015eb.js?hidden=1';
    }
    if(process.env.BUILD_ENV === 'PEIYOU'){
        j.src = 'https://qiyukf.com/script/8ce367faf9cc78d97fac7a47cb4015eb.js?hidden=1';
    }
    if(process.env.BUILD_ENV === 'TWOTEACHER'){
        j.src = 'https://qiyukf.com/script/8ce367faf9cc78d97fac7a47cb4015eb.js?hidden=1';
    }
    d.body.appendChild(j);
}

function resetQiyuSetting () {
    const styleElm = document.createElement('style');
    styleElm.innerText = `#YSF-BTN-HOLDER:hover {
    filter: alpha(opacity=95);
    opacity: 1;
}
#YSF-BTN-HOLDER {
    opacity: .8;
}
`;
    document.head.appendChild(styleElm);

    const qiyuElm = document.getElementById('YSF-BTN-HOLDER');
    const entryElm = qiyuElm.querySelector("div:first-child");
    const circleBtnElm = qiyuElm.querySelector('#YSF-BTN-CIRCLE');
    const bubbleBtnElm = qiyuElm.querySelector('#YSF-BTN-BUBBLE');
    qiyuElm.setAttribute("style", "right: 0;bottom: 89px;max-width: 34px;");
    entryElm.setAttribute("style", `
background: #457FE2;
box-shadow: -1px 0px 8px 0px rgba(40,72,128,0.36);
border-radius: 5px 0 0 5px;
`);
    entryElm.innerHTML = `<div style="display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
height: 106px;
width: 34px;
font-size: 13px;
font-weight: bold;
color: #ffffff;
">
    <img src="${ITserviceSvg}" style="width: 18px;
      height: 18px;
      margin-bottom: 6px;">
    <span style="display: block;width: 14px;text-align: center;line-height: 18px;">IT客服</span>
</div>`;
    circleBtnElm.setAttribute("style", "right: 0px;top: -4px;");
    bubbleBtnElm.setAttribute("style", "left: -280px;");
}

function loadQiyuScript () {
    return new Promise((resolve, reject) => {
        try{
            let script = document.getElementById('qiyukf');
            if(!script){
                downloadQiyuScript(window, document, 'ysf');
                ysf('onready', function () {
                    //config custom style & events
                    resetQiyuSetting()
                    return resolve();
                })
            }else{
                return resolve();
            }
        }catch(e){
            console.log(e);
            reject('加载客服插件失败')
        }
    })
}

function getOaUserInfo (userInfo) {
    try{
        const { name, emailAccount, employeeNo } = userInfo;
        if(!employeeNo){
            throw new Error('required user employeeNo do not exist')
        }

        return {
            "data": [
                {
                    "key": "real_name",
                    "value": name || ''
                },
                {
                    "hidden": true,
                    "key": "mobile_phone"
                },
                {
                    "key": "email",
                    "value": emailAccount || ''
                },
                {
                    "href": "",
                    "index": 0,
                    "key": "account",
                    "label": "账号",
                    "value": employeeNo || ''
                },
                {
                    "index": 1,
                    "key": "sex",
                    "label": "性别",
                    "value": ""
                },
                {
                    "index": 5,
                    "key": "reg_date",
                    "label": "注册日期",
                    "value": ""
                },
                {
                    "index": 6,
                    "key": "last_login",
                    "label": "上次登录时间",
                    "value": ""
                }
            ],
            "uid": employeeNo
        }
    }catch(e){
        console.log(e);
        throw new Error('获取用户信息失败,请刷新网页');
    }
}

function configQiyu (data) {
    return new Promise((resolve, reject) => {
        var stringData = '';
        try {
            if (!data.data) {
                throw new Error();
            }
            if (!Array.isArray(data.data) || data.data.length === 0) {
                throw new Error();
            }
            stringData = JSON.stringify(data.data);
            if (!stringData.trim()) {
                throw new Error();
            }
        } catch (e) {
            return reject('客服插件配置异常,请刷新网页');
        }
        ysf('config', {
          "uid": data.uid,
          "data": stringData,
          success: function () {
            resolve(true);
          },
          error: function () {
            reject('客服插件配置异常,请刷新网页');
          }
        });
    })
}

function setQiyuVisibility (visible) {
    const qiyuElm = document.getElementById('YSF-BTN-HOLDER');
    if(qiyuElm && visible){
        qiyuElm.style.display = 'unset';
    }
    return;
}

export async function initQiyu (userInfo) {
    let isQiyuReady = false;
    try{
        await loadQiyuScript();
        isQiyuReady = await configQiyu(getOaUserInfo(userInfo));
        console.log('init Qiyu success');
    }catch(e){
        console.error('init Qiyu error: '+ e.message);
        showToast(e.message, 'error')
        isQiyuReady = false;
    }
    setQiyuVisibility(isQiyuReady);
    return isQiyuReady
}

export function exitQiyu () {
    if(ysf){
        ysf('logoff')
        console.log('Qiyu exited')
    }
    return false;
}
