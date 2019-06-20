/**
 * 考勤状态
 */
const attendanceDict = [
  { val: 'NEW', text: '未上课' },
  { val: 'CONPELETE', text: '准时上课' },
  { val: 'LEAVE', text: '请假' },
  { val: 'ABSENT', text: '缺勤' },
  { val: 'LATE', text: '迟到' },
]

/**
 * 课程状态
 */
const courseStatusDict = [
  { val: 'CHARGED', text: '已结算' },
  { val: 'TEACHER_ATTENDANCE', text: '老师已考勤' },
  { val: 'NEW', text: '未上课' },
]

export default {
  attendanceDict,
  courseStatusDict,
}
