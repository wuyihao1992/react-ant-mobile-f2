/**
 * Created by Haolin<haolinhom@gmail.com> on 2019/1/17.
 */
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

const preArr = [pre, peiYouPre, twoTeacherPre];
const prdArr = [prd, peiYou, twoTeacher];

// 教学接口(用于学生档案)
let jiaoXueBaseUrl = 'https://test-teaching.xiaojiaoyu100.com/tea_api/';
// 教学-续费个辅-档案页面
let jiaoXuePageUrl = 'http://test.ydy.teaching.xiaojiaoyu100.com/#/';

if (process.env) {
  if (preArr.indexOf( process.env.BUILD_ENV) !== -1) {
    jiaoXueBaseUrl = 'https://pre-teaching.xiaojiaoyu100.com/tea_api/';
    jiaoXuePageUrl = 'http://pre.ydy.teaching.xiaojiaoyu100.com/#/';

  } else if (prdArr.indexOf( process.env.BUILD_ENV) !== -1) {
    jiaoXueBaseUrl = 'https://teaching.xiaojiaoyu100.com/tea_api/';
    jiaoXuePageUrl = 'http://teaching.xiaojiaoyu100.com/#/';
  }
}

export {
  jiaoXueBaseUrl,
  jiaoXuePageUrl,
};
