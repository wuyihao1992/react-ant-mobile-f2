/**
 * 状态
 */
const statusDict = [
  { val: '0', text: '有效' },
  { val: '1', text: '无效' },
]

/**
 * 产品类型
 */
const ONE_ON_ONE_COURSE = 'ONE_ON_ONE_COURSE'
const SMALL_CLASS = 'SMALL_CLASS'
const ECS_CLASS = 'ECS_CLASS'
const OTHERS = 'OTHERS'
const ONE_ON_MANY = 'ONE_ON_MANY'
const TWO_TEACHER = 'TWO_TEACHER'
const LECTURE = 'LECTURE'
const LIVE = 'LIVE'
const GIFT_COURSES = 'GIFT_COURSES'
const GIFT_COURSES_BY_RATE = 'GIFT_COURSES_BY_RATE'

const productTypeDict = [
  { val: ONE_ON_ONE_COURSE, text: '一对一', id: '8a29f6b04abf39fe014ac267ca5e0068' },
  { val: SMALL_CLASS, text: '小班', id: '8a29f6b04abf39fe014ac267e9460069' },
  { val: ECS_CLASS, text: '目标班', id: '8a29f6b04abf39fe014ac2685360006a' },
  { val: OTHERS, text: '其他', id: '8a29f6b04abf39fe014ac2686f79006b' },
  { val: ONE_ON_MANY, text: '一对多', id: '07397938-aaf7-11e5-8581-ed024140' },
  { val: TWO_TEACHER, text: '双师', id: 'TWO_TEACHER' },
  { val: LECTURE, text: '讲座', id: '4028b88154e7582e0154e759ebfa0049' },
  { val: LIVE, text: '直播', id: '' },
]

/**
 * 体验课设置
 */
const feelClassDict = [
  { val: 'DAT000000000465', text: '体验课9课时' },
  { val: 'DAT000000000466', text: '体验课6课时' },
  { val: 'DAT000000000467', text: '不允许体验课' },
]

/**
 * 一对多类型
 */
const o2mTypeDict = [{val: '2', text: '一对二'}, {val: '3', text: '一对三'}, {val: '4', text: '一对四'}, {val: '5', text: '一对五'}]

export default {
  statusDict,
  productTypeDict,
  feelClassDict,
  o2mTypeDict,
  ONE_ON_ONE_COURSE,
  SMALL_CLASS,
  ECS_CLASS,
  OTHERS,
  ONE_ON_MANY,
  TWO_TEACHER,
  LECTURE,
  LIVE,
  GIFT_COURSES,
  GIFT_COURSES_BY_RATE,
}
