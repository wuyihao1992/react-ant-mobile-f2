/**
 * Created by Haolin<haolinhom@gmail.com> on 2019/3/5.
 */
// 导出状态
const exportStatus = {
  // 待导出
  willExport: {
    text: '待导出',
    val: 0,
  },
  // 导出中
  exporting: {
    text: '导出中',
    val: 1,
  },
  // 成功
  success: {
    text: '导出成功',
    val: 2,
  },
  // 失败
  fail: {
    text: '导出失败',
    val: 3,
  },
};

export default {
  exportStatus,
}
