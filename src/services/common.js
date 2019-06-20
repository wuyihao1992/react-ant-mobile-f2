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
  findOrganizationBySchoolId: 'SystemAction/findOrganizationBySchoolId.do',  //根据学校获取行政区划
  getSchoolByBlCampus: 'CommonAction/getSchoolByBlCampus.do',  //根据校区(城市)获取学校(不是用校区id，而是城市id)
  getCampusByLoginUserNew: 'CommonAction/getCampusByLoginUserNew.do',  //获取当前登录用户可见的校区（按分公司分组）
  getUserByRoldCodesSelection: 'CommonAction/getUserByRoldCodesSelection.do', //根据角色获取用户  参数如：roleCode=TEATCHER
  getRoleLevelForSelection: 'CommonAction/getRoleLevelForSelection.do',  //获取角色等级
  getSelectOption: 'CommonAction/getSelectOption.do',  //获取字典
  // 获取字典
  getSelectOptionNew: 'CommonAction/getSelectOptionNew.do',
  getMenuList: 'SystemAction/getMenuList.do',  //获取菜单
  listMyCollection: 'SystemAction/listMyCollection.do',  //获取收藏列表
  addMyCollection: 'SystemAction/addMyCollection.do',  //添加收藏
  delMyCollection: 'SystemAction/delMyCollection.do',  //根据ID删除收藏
  delMyCollectionByResId: 'SystemAction/delMyCollectionByResId.do',  //根据菜单ID删除收藏
  getSystemConfigList: 'SystemAction/getSystemConfigList.do',  //获取系统配置
  findPageFAQ: 'FAQController/findPageFAQ.do',  //获取常见问题列表
  findOrganizationById: 'SystemAction/findOrganizationById.do',  //根据分公司或校区获取行政区划
  getCampusByRegionId: 'CommonAction/getCampusByRegionId.do',  //根据省市获取校区
  getStudentSchoolByRegionId: 'CommonAction/getStudentSchoolByRegionId.do',  //根据省市获取公校
  getAllBranch: 'SystemAction/getAllBranch.do',  //获取所有分公司
  getDeptAndCampusByBranchId: 'SystemAction/getDeptAndCampusByBranchId.do',  //根据分公司id获取校区和分公司部门
  getBrenchForSelection: 'CommonAction/getBrenchForSelection.do',  //获取所有分公司
  getRenkeHekuaxiaoquTeacher: 'TeacherSubjectController/getRenkeHekuaxiaoquTeacher.do',  //获取任课老师和跨校区老师
  getSseKey: 'MobileInterface/getSseKey.do',  //获取oss上传配置
  previewFile: 'StudentController/previewFile.do',
  getRoleForSelection: 'CommonAction/getRoleForSelection.do',  //获取系统角色
  getCampusByLoginUser: 'CommonAction/getCampusByLoginUser.do',  //所属校区
  getDistinctUserGroupByCampus: 'CommonAction/getDistinctUserGroupByCampus.do',  //获取登录用户组织架构用户
  getAllCampusForSelection: 'CommonAction/getAllCampusForSelection.do',  //获取所有校区
  findStudentsByCampusId: 'StudentController/findStudentsByCampusId.do', // 根据校区ID获取学生
  getTeachersByCampusId: 'CourseController/getTeacherBycampusId.do',//根据校区ID获取老师
  getClassroomByCampu: 'ClassroomManageController/getClassroomByCampus.do', //根据校区ID获取教室
  getConflictName:'CourseController/getConflictName.do',//获取冲突名单
  getMiniClassInfoBySelect: 'CourseController/getMiniClassInfoBySelect.do', //获取排课列表
  getConflictMiniClassInfo:'CourseController/getConflictMiniClassInfo.do', //获取冲突班课的信息
  getConflictMiniCourseInfo: 'CourseController/getConflictMiniCourseInfo.do', //获取冲突班课课程的信息
  changetoGetConflictInfo:{
    url: 'CourseController/changetoGetConflictInfo.do',
    method: 'POST',
    dataType: 'json'
  },//换课时获取冲突的信息
  sendDataBuryingPoint:{url:'OperateRecordCountController/saveCount.do',method:'POST',dataType:'JSON'},//数据埋点(伟洪需求，熊魁数据库)
  changeClassRoomOrTeacher: {
    url: 'CourseController/changeClassRoomOrTeacher.do',
    method: 'POST',
    dataType: 'json'
  }, // 更换教室或老师或时间
  getStudentConflictCourse: 'CourseController/getStudentConflictCourse.do', // 调课界面显示原班课程是否冲突信息
  getStudentConflictCourseNew: 'CourseController/getStudentConflictCourseNew.do', // 调课界面显示原班课程是否冲突信息(批量)
  getChangeMiniClassList: 'CourseController/getChangeMiniClassList.do',//获取可调班的列表（换课
  changeCourse:{
    url: 'CourseController/changeCourse.do',
    method: 'POST',
    dataType: 'json',
  }, //学生换课
  getSubSelectOptionBySuper: 'DataDictController/getSubSelectOptionBySuper.do',//获取小班班级类型
  checkConflictAfterChangeCourse:{
    url: 'CourseController/checkConflictAfterChangeCourse.do',
    method: 'POST',
    dataType: 'json',
  } ,//检测调课后是否依然有冲突（换课）
  getStudentIdByBlCampusId: 'CourseController/getStudentIdByBlCampusId.do',//根据校区id和日期获取学生列表(新)
  getCurrentDateTime: '/CommonAction/getCurrentDateTime.do', // 获取当前日期时间
// 获取班级层次(通过班级类型)
  findClassLevelByClassType: 'ProductController/findClassLevelByClassType.do',
  getReceptionistGroupByCampus:"CommonAction/getReceptionistGroupByCampus.do",// 获取前台分配咨询师
  /**
   * 获取双师主讲老师字典(当前登录用户所属校区)
   * */
  getMainClassTcDict: 'TwoTeacherClassController/getLoginUserMainTeacherList.do',
  /**
   * 获取双师辅导老师字典(当前登录用户所属校区)
   * */
  getAuxClassTcDict: 'TwoTeacherClassController/getLoginUserTwoTeacherList.do',
  /**
   * 获取小班班主任字典
   * */
  getSmallClassTcDict: 'PromiseClassController/findMiniClassTeacherForSelect.do',
  /**
   * 获取 产品类型->班级类型->班级层次 字典树
   * */
  findClassLevelTree: 'ProductController/findClassLevelTree.do',
  // 获取所有双师主讲老师字典
  getAllMainClassTcDict: 'LectureClassController/getAllMainTeacher.do',
  /**
   * 根据组织类型获取当前登录用户可见的所有组织
   */
  getAllOrganizationForSelection: 'CommonAction/selectOrgOptionOfBranch.do',
  /**
   * 获取产品类型，产品系列，班级类型树结构
   */
  getProductTree: 'ProductController/findClassLevelTree.do',
  /**
   * 获取产品类型，星火双师培优各不一样
   */
  getProductTypes: 'ProductController/getProductCategoryFirstFloor.do',
}

export default buildApi(config)
