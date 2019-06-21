import fetch from 'dva/fetch'
import { errors } from 'CONST/config'

const defaultOptions = { credentials: 'same-origin' }

/**
 * 发起fetch请求，以及返回状态处理和数据的读取，接受json、boolean、text格式
 * @param  {string}  url  //请求的url如果是GET请求，为已拼接好参数的url
 * @param  {object}  options
 * @return {Promise}
 */
async function request(url, options){
  let res
  try{
    res = await fetch(url, { ...defaultOptions, ...options })
  }catch(e){
    throw errors.netError
  }

  const { status } = res
  if(status > 500){
    throw errors.systemError
  }else if(status === 401){
    throw errors.loginTimeout
  }else if(status !== 200 && status !== 400 && status !== 500){
    throw errors.netError
  }

  let dataType
  let data
  try{
    data = await res.clone().json()
    if(typeof data === 'boolean'){
      dataType = 'boolean'
    }else{
      dataType = 'json'
    }
  }catch(e){
    try{
      data = await res.clone().text()
      dataType = 'text'
    }catch(e){
      throw errors.systemError
    }
  }

  if(status === 400 || status === 500){
    if(dataType === 'json'){
      const { resultCode, resultMessage } = data
      if(resultCode !== 0 && resultMessage){
        throw { ...errors.systemError, text: resultMessage }
      }
    }
    throw errors.systemError
  }

  const count = res.headers.get('x-total-count')
  return {
    status,
    dataType,
    data,
    headers: count ? { "x-total-count": count } : {},
  }
}

export default request
