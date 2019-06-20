import {
  peiYouTest,
  peiYouPre,
  peiYou,
  twoTeacherTest,
  twoTeacherPre,
  twoTeacher,
  uat,
  pre,
  prd,
} from 'CONST/buildEnv';

const urlBase = '/eduboss/';

const errors = {
  netError: { errorType: 1, text: '网络错误，请稍后重试' },
  systemError: { errorType: 2, text: '系统错误，请联系管理员' },
  loginTimeout: { errorType: 3, text: '登录超时，请重新登录' },
  serverError: { errorType: 4, text: '服务器错误，请联系管理员' },
};

const OLDPAGEBASE = '/oldPage';
const WELCOMEHTML = 'function/welcome.html';
// 无需java调试旧Boss前端页面
const PROXY_OLD_BOSS = process.env.PROXY_OLD_BOSS;
const PROXY_OLD_BOSS_URL = process.env.PROXY_OLD_BOSS_URL;

let PROJECT_NAME = 'spark';
let SYSTEM_MARK = 'XINGHUO';
if(process.env){
  switch (process.env.BUILD_ENV){
    case peiYouTest:
    case peiYouPre:
    case peiYou:
      PROJECT_NAME = 'peiyou';
      SYSTEM_MARK = 'ADVANCE';
      break;
    case twoTeacherTest:
    case twoTeacherPre:
    case twoTeacher:
      PROJECT_NAME = 'twoteacher';
      SYSTEM_MARK = 'TWO_TEACHER';
      break;
    default:
      PROJECT_NAME = 'spark';
      SYSTEM_MARK = 'XINGHUO';
  }
}

const preArr = [pre, peiYouPre, twoTeacherPre];
const prdArr = [prd, peiYou, twoTeacher];

//阿里云OSS前缀，默认UAT，用于成绩导入模板，不区分星火双师培优 2018.11.05
let OSSPREFIX = 'https://xhboss-test.oss-cn-shenzhen.aliyuncs.com';
if (process.env) {
  if (preArr.indexOf( process.env.BUILD_ENV) > -1) {
    OSSPREFIX = 'https://xhboss-pre.oss-cn-shenzhen.aliyuncs.com';
  } else if (prdArr.indexOf( process.env.BUILD_ENV) > -1) {
    OSSPREFIX = 'https://xinghuo-eduboss.oss-cn-shenzhen.aliyuncs.com';
  }
}

export {
  urlBase,
  errors,
  OLDPAGEBASE,
  WELCOMEHTML,
  PROJECT_NAME,
  SYSTEM_MARK,
  OSSPREFIX,
  PROXY_OLD_BOSS,
  PROXY_OLD_BOSS_URL,
};
