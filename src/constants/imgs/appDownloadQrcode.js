/**
 * Created by Haolin<haolinhom@gmail.com> on 2018/8/3.
 */
import appPEIYOU from 'ASSET/imgs/appdownloadpageAplus.png'
import appXINGHUO from 'ASSET/imgs/appdownloadpageXingHuo.png'
import {
  peiYouTest,
  peiYouPre,
  peiYou,
} from 'CONST/buildEnv';

let appDownloadPath = appXINGHUO;
let checkPeiYouList = [
  peiYouTest,
  peiYouPre,
  peiYou,
];
if (process.env && checkPeiYouList.indexOf(process.env.BUILD_ENV) !== -1) {
  appDownloadPath = appPEIYOU;
}
export default appDownloadPath;
