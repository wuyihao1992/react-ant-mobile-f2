import { httpGet, httpPost } from 'UTIL/http'

/**
 * 根据配置信息构建可供调用的Api方法
 * @param  {object}  //配置信息集合
 * @return {object}  //Api方法集合
 */
const buildApi = (config) => {
  let output = {}
  Object.keys(config).forEach(key => {
    const detail = config[key] 
    const isObject = typeof detail === 'object'
    const func = isObject && detail.method === 'POST' ? httpPost : httpGet
    const url = isObject ? detail.url : detail
    output[key] = (params, noTips) => func({ url, params, dataType: detail.dataType }, noTips)
  })
  return output
}

export default buildApi