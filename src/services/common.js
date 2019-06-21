import buildApi from './buildApi'

/**
 * Api配置信息，key为Api唯一标识，value为object-->{ url, method }，或者string-->url（method默认为GET）
 */
const config = {
  login: 'UserController/loginCallBackNew.do',  //登录
  getLoginUserInfo: 'SystemAction/getLoginUserInfo.do',  //获取当前登录用户信息
  getButtonAuthTags: 'SystemAction/getButtonAuthTags.do',  //获取当前登录用户操作权限（控制某些功能按钮显示与否）
  getUserToken: 'UserController/getUserToken.do',  //获取用户令牌
  getCookieCallsPhoneCheckFail: 'MobileInterface/getCookieCallsPhoneCheckFail.do',  //获取来电token验证失败的数据
  selectOrgByIdAndTypeOption: 'CommonAction/selectOrgByIdAndTypeOption.do',  //根据ID或类型获取组织机构
  getRegionList: 'SystemAction/getRegionList.do',  //获取行政区划（省、市）
  getUserByRoldCodesSelection: 'CommonAction/getUserByRoldCodesSelection.do', //根据角色获取用户  参数如：roleCode=TEATCHER
  getSelectOption: 'CommonAction/getSelectOption.do',  //获取字典
  // 获取字典
  getBrenchForSelection: 'CommonAction/getBrenchForSelection.do',  //获取所有分公司
  getCampusByLoginUser: 'CommonAction/getCampusByLoginUser.do',  //所属校区
  getAllCampusForSelection: 'CommonAction/getAllCampusForSelection.do',  //获取所有校区
  // 获取小班班主任字典
  getSmallClassTcDict: 'PromiseClassController/findMiniClassTeacherForSelect.do',

  existUserId: 'SystemAction/existUserId.do',  //查询用户是否可登录 https://api.xuebangsoft.me/index.do#/f7525741-db26-4bb4-8475-7555d19dadcc/front/interfaceDetail/35ca394e-093d-427b-bb21-54567b487e56

};

export default buildApi(config)
