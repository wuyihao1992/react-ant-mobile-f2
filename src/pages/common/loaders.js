import { getDataDictList } from 'SERVICE/system'
import { getDistinctUserGroupByCampus } from 'SERVICE/common'

const loadSourceDetailDict = async (source) => {
  const data = await getDataDictList({
    category: 'CUS_ORG',
    'parentDataDict.id': source,
  })
  const dict = data.rows.map(d => {
    return { val: d.id, text: d.name }
  })
  return dict
}

const loadConsultantDict = async (params) => {
  const api = await getDistinctUserGroupByCampus({ ...params, showBelong: 1, job: ['ZXS', 'ZXZG'] })
  return api.map(d => {
    return { val: d.userId, text: d.userName }
  })
}

export default {
  loadSourceDetailDict,
  loadConsultantDict,
}
