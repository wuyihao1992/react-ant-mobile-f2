/**
 * Created by Haolin<haolinhom@gmail.com> on 2019/3/5.
 */
// 收款类型
const chargeType = [
  {
    text: 'A',
    val: 'A',
  },
  {
    text: 'B',
    val: 'B',
  },
  {
    text: '空',
    val: 'AB',
  },
];
// 扣费类型
const deductType = [
  {
    text: '正常',
    val: 'NORMAL',
  },
  {
    text: '划归收入',
    val: 'IS_NORMAL_INCOME',
  },
  {
    text: '冲销',
    val: 'WASH',
  },
];

export default {
  chargeType,
  deductType,
};
