import {
  uat,
  pre,
  prd,
  peiYouTest,
  peiYouPre,
  peiYou,
  twoTeacherTest,
  twoTeacherPre,
  twoTeacher,
} from 'CONST/buildEnv';
import * as Qiyu from 'SERVICE/qiyukf'

const subfixConfig = {
  xh: 'oauth2/boss',
  py: 'oauth2/pyboss',
  ss: 'oauth2/ssboss',
};
const hostConfig = {
  test: 'https://logintest.xiaojiaoyu100.com/',
  pre: 'https://loginpre.xiaojiaoyu100.com/',
  prd: 'https://login.xiaojiaoyu100.com/',
};
const loginSysConfig = {
  [uat]: {
    subfix: subfixConfig.xh,
    host: hostConfig.test,
  },
  [pre]: {
    subfix: subfixConfig.xh,
    host: hostConfig.pre,
  },
  [prd]: {
    subfix: subfixConfig.xh,
    host: hostConfig.prd,
  },
  [peiYouTest]: {
    subfix: subfixConfig.py,
    host: hostConfig.test,
  },
  [peiYouPre]: {
    subfix: subfixConfig.py,
    host: hostConfig.pre,
  },
  [peiYou]: {
    subfix: subfixConfig.py,
    host: hostConfig.prd,
  },
  [twoTeacherTest]: {
    subfix: subfixConfig.ss,
    host: hostConfig.test,
  },
  [twoTeacherPre]: {
    subfix: subfixConfig.ss,
    host: hostConfig.pre,
  },
  [twoTeacher]: {
    subfix: subfixConfig.ss,
    host: hostConfig.prd,
  },
};

let subfix = '';
let host = '';
if (process.env) {
  let buildEnv = process.env.BUILD_ENV;
  if (buildEnv) {
    subfix = loginSysConfig[buildEnv].subfix;
    host = loginSysConfig[buildEnv].host;
  } else {
    // 默认uat
    subfix = loginSysConfig[uat].subfix;
    host = loginSysConfig[uat].host;
  }
}

//跳转到登录页面
const gotoLoginPage = () => {
  const href = host + subfix + '?redirect_uri=' + encodeURIComponent(window.location.origin+'/oauth2Callback')
  window.location.href = href
};

//退出登录
//const logout = () => window.location.href = `${urlBase}j_spring_security_logout`  //退出登录（旧）
const logout = () => {
  Qiyu.exitQiyu();
  const href = host + 'user/logout?next=/'+ subfix +'?redirect_uri=' + encodeURIComponent(window.location.origin+'/oauth2Callback')
  // console.log('loginout', href)
  window.location.href = href
}

export default {
  gotoLoginPage,
  logout,
}
