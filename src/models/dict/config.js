import {
  loadCommonDict, loadBranchDict,
  loadCampusDict, loadBranchCampusDict, loadClassLevelDict,
  loadMainClassTcDict, loadAuxClassTcDict,
  loadAllMainClassTcDict, loadBaseStatusDict, loadClassLevelTree, } from 'UTIL/dict';
import { chargeType, deductType, } from 'CONST/dicts';

/**
 * 配置: 加载字典
 * */
const dictConfig = {
  // 分公司
  branch: loadBranchDict,
  // 校区
  campus: loadCampusDict,
  // 分公司校区
  branchCampus: loadBranchCampusDict,
  //产品类型
  productType() {
    return loadCommonDict('PRODUCT_TYPE');
  },
  // 产品性质(全部)
  productCharacter() {
    return loadCommonDict('PRODUCT_CHARACTER');
  },
  // 年份
  year() {
    return loadCommonDict('PRODUCT_VERSION');
  },
  // 季度
  quarter() {
    return loadCommonDict('PRODUCT_QUARTER');
  },
  // 年级
  grade() {
    return loadCommonDict('STUDENT_GRADE');
  },
  // 科目
  subject() {
    return loadCommonDict('SUBJECT');
  },
  // 期数
  phase() {
    return loadCommonDict('SMALL_CLASS_PHASE');
  },
  // 星期数
  weekDay() {
    return loadCommonDict('WeekDay');
  },
  // 全部班级类型
  classTypeAll() {
    return loadCommonDict('CLASS_TYPE');
  },
  /**
   * 班级类型
   * @param prdType string (e.g. 'TWO_TEACHER')
   * */
  classType(prdType) {
    return loadCommonDict('CLASS_TYPE', prdType);
  },
  // 全部班级层次
  classLevelAll() {
    return loadClassLevelDict(null);
  },
  // 班级层次
  classLevel(classType) {
    return loadClassLevelDict(classType);
  },
  // 产品系列(全部)
  courseSeries() {
    return loadCommonDict('COURSE_SERIES');
  },
  // 产品系列
  courseSeriesSingle(classType) {
    return loadCommonDict('COURSE_SERIES', classType);
  },
  // 产品组
  productGroup() {
    return loadCommonDict('PRODUCT_GROUP');
  },
  // 讲座状态
  lectureStatus() {
    return loadCommonDict('LectureClassStatus');
  },
  // 讲座考勤状态
  lectureAttendanceStatus() {
    return loadCommonDict('LectureClassAttendanceStatus');
  },
  // 讲座学生扣费状态
  lectureStdChargeStatus() {
    return loadCommonDict('LectureClassStudentChargeStatus');
  },
  // 双师主讲老师(登录账户能看到的数据)
  twoTcMainTc() {
    return loadMainClassTcDict();
  },
  // 双师辅导老师(登录账户能看到的数据)
  twoTcAuxTc() {
    return loadAuxClassTcDict();
  },
  // 所有双师主讲老师
  allTwoTcMainTc() {
    return loadAllMainClassTcDict();
  },
  // 基础状态('TRUE', 'FALSE')
  baseStatus() {
    return loadBaseStatusDict();
  },
  // 合同类型
  contractType() {
    return loadCommonDict('ContractType');
  },
  // (合同)支付状态
  paidStatue() {
    return loadCommonDict('ContractPaidStatus');
  },
  // 资源入口
  resEntrance() {
    return loadCommonDict('RES_ENTRANCE');
  },
  // 收款类型
  chargeType() {
    return chargeType;
  },
  // 扣费类型
  deductType() {
    return deductType;
  },
  // 课程状态(未上课、上课中、已完成)
  courseStatus() {
    return loadCommonDict('MiniClassStatus');
  },
  // 直播间
  liveRoom() {
    return loadCommonDict('LIVE_ROOM');
  },
  // 产品类型->班级类型->班级层次 字典树
  classLevelTree() {
    return loadClassLevelTree();
  },
  // 产品类型->班级类型->班级层次 级联树
  classLevelCascadeTree() {
    return loadClassLevelTree(true);
  },
};

export default dictConfig;
