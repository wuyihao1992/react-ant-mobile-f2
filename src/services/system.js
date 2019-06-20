import buildApi from './buildApi'

/**
 * Api配置信息，key为Api唯一标识，value为object-->{ url, method }，或者string-->url（method默认为GET）
 */
const config = {
  getUserList: 'SystemAction/getUserList.do',  //获取用户列表
  findUserById: 'SystemAction/findUserById.do',  //根据ID获取用户信息
  editRole: { url: 'SystemAction/editRole.do', method: 'POST' },  //保存角色信息
  getOrganizationTree: 'SystemAction/getOrganizationTree.do',  //获取组织机构树
  findOrganizationById: 'SystemAction/findOrganizationById.do',  //根据ID获取组织机构
  getRoleList: 'SystemAction/getRoleList.do',  //获取角色列表
  findRoleById: 'SystemAction/findRoleById.do',  //根据ID获取角色信息
  getResourceList: 'SystemAction/getResourceList.do',  //获取角色权限树
  getDataDictTypeList: 'DataDictController/getDataDictTypeList.do',  //获取字典列表
  editDataDict: 'DataDictController/editDataDict.do',  //保存字典信息
  existUserId: 'SystemAction/existUserId.do',  //查询用户是否可登录 https://api.xuebangsoft.me/index.do#/f7525741-db26-4bb4-8475-7555d19dadcc/front/interfaceDetail/35ca394e-093d-427b-bb21-54567b487e56
  findOrganization: 'SystemAction/findOrganization.do',  //控制组织架构紧急状态列表的数据 https://api.xuebangsoft.me/index.do#/f7525741-db26-4bb4-8475-7555d19dadcc/front/interfaceDetail/d901ddaf-7ec8-4d78-a4c9-f6c8370c9556
  updateOrgStatusById: 'SystemAction/updateOrgStatusById.do',  //切换紧急状态 https://api.xuebangsoft.me/index.do#/f7525741-db26-4bb4-8475-7555d19dadcc/front/interfaceDetail/20c0c14e-b45d-4620-9023-230d25226795
  updateBatchOrgStatusById: 'SystemAction/updateBatchOrgStatusById.do',  //批量切换紧急状态 https://api.xuebangsoft.me/index.do#/f7525741-db26-4bb4-8475-7555d19dadcc/front/interfaceDetail/e8cdd454-9877-407f-94c0-5f179aa1987e
  getDataDictList: 'DataDictController/getDataDictList.do',  //根据父类型获取字典category, parentDataDict.id
  getDataDictBySonId: 'DataDictController/getDataDictBySonId.do',  //获取父类型字典项 sonId

  getBossOrganizationList: 'OrganizationController/getBossOrganizationList.do',  //获取组织架构树
  saveHrmsOrgToBoss: { url: 'OrganizationController/saveHrmsOrgToBoss.do', method: 'POST' },  // 勾选人事组织架构到BOSS使用
  cacelHrmsOrgInBoss: { url: 'OrganizationController/cacelHrmsOrgInBoss.do', method: 'POST' },  // 取消人事组织架构到BOSS使用
  getOrganizationById: 'OrganizationController/getOrganizationById.do',  //获取组织架构信息

  getOrganizationAppendInfoById: 'OrganizationController/getOrganizationAppendInfoById.do',  //获取组织架构地址电话信息
  saveBossOrganizationInfo: { url: 'OrganizationController/saveBossOrganizationInfo.do', method: 'POST', dataType: 'json' },  // 保存组织架构信息

  getUserInfoList: 'UserController/getUserInfoList.do',  //获取用户列表
  getUserInfoByUserId: 'UserController/getUserInfoByUserId.do',  //获取用户详情
  modifyUserInfo: { url: 'UserController/modifyUserInfo.do', method: 'POST', dataType: 'json' },  // 修改用户组织架构角色
  getResourceBoy: 'SystemAction/getResourceBoy.do',  //获取当前用户的组织架构树
  checkUserOrgCanModify: { url: 'UserController/checkUserOrgCanModify.do', method: 'POST', dataType: 'json' },  // 检查用户是否可以修改组织架构

  logoutSystem: { url: 'UserController/loginOut.do' },  // 退出系统

  findResourcePoolByIdNew: { url: 'ResourcePoolController/findResourcePoolByIdNew.do' },  // 查询资源池信息
  getOrganizationListForResPool: { url: 'ResourcePoolController/getOrganizationListForResPool.do' },  // 获取资源池可回收节点列表
  getResourcePoolRoleList: { url: 'ResourcePoolController/getResourcePoolRoleList.do' },  // 获取资源池可见角色

  editRoleNew: { url: 'SystemAction/editRoleNew.do', method: 'POST', dataType: 'json' },  // 保存角色
  updateRoleStatusById: { url: 'SystemAction/updateRoleStatusById.do', method: 'POST' },  // 修改角色或资源池状态

  getNotice: { url: 'StudentController/getNotice.do' },  // 获取系统消息
  getLoginUserProvinceCity: { url: 'SystemAction/getLoginUserProvinceCity.do' },  // 获取当前登录用户所属省份城市


  //报读周期管理
  loadListApi: 'EnrollPeriodController/listEnrollPeriodInfos.do',
  loadDetailApi: 'EnrollPeriodController/getEnrollPeriodInfo.do',
  addApi: { url: 'EnrollPeriodController/saveEnrollPeriod.do', method: 'POST', dataType: 'json' },
  editApi: { url: 'EnrollPeriodController/updateEnrollPeriod.do', method: 'POST', dataType: 'json' },
  changeStatusApi: { url: 'EnrollPeriodController/invalidEnrollPeriod.do', method: 'POST' },
  getClassTreeApi: 'EnrollPeriodController/listClassInfos.do',

  submitExpiredProduct: 'SystemAction/cleanOutExpiredProduct.do',// 清理过季产品
  getExpiredProductList: 'SystemAction/findExpiredProductList.do',// 获取过季产品列表
  getExpiredStudentList: 'SystemAction/findExpProdStuDetailList.do',// 获取过季产品学生详情
  listAllSystemParameter: "SystemParameterController/listAllSystemParameter.do",
  getSystemParameterInfoByType: "SystemParameterController/getSystemParameterInfoByType.do",
  updateSystemParameter: { url: "SystemParameterController/updateSystemParameter.do", method: "POST", dataType: "json" },
  editUserPersonal: 'SystemAction/editUserPersonal.do',
  getAccessUserListByBrenchId: 'SystemAction/getAccessUserListByBrenchId.do',
  setEmergentAuthority: 'SystemAction/setEmergentAuthority.do',
  getUserListByCampusId: { url: 'SystemAction/getUserListByCampusId.do', method: 'POST', dataType: 'json' },
  findOrganizationNew: { url: 'SystemAction/findOrganizationNew.do', method: 'POST' },
  updateOrgStatusByIdNew: 'SystemAction/updateOrgStatusByIdNew.do',
  updateBatchOrgStatusByIdNew: 'SystemAction/updateBatchOrgStatusByIdNew.do',
}

export default buildApi(config)
