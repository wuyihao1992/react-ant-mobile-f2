import request from './fetch'
import { urlBase } from 'CONST/config'
import { errors } from 'CONST/config'
import {showToast} from 'COMPONENT/messenger'
import { gotoLoginPage } from 'SERVICE/account'

/**
 * 将json形式的参数拼接成以&连接的url参数字符串
 * @param  {object} params
 * @return {string}
 */
const makeQueryString = (params) => {
  let queryString = ''
  if(params){
    Object.keys(params).forEach((key, i) => {
      const value = params[key]
      if(i > 0){
        queryString += '&'
      }
      queryString += `${key}=${value === null || value == undefined ? '' : value}`
    })
  }
  return queryString
}

/**
 * 错误处理
 * @param  {object}  //自定义的错误信息，具体参见UTIL/config/errors
 * @param  {boolean?}  noTips  是否不显示错误提示
 */
let loginTimeoutHandled
const handleError = (e, noTips) => {
  if (e.errorType === 3) {
    if (!loginTimeoutHandled) {
      showToast(e.text)
      gotoLoginPage()
      //setTimeout(gotoLoginPage, 500)
      loginTimeoutHandled = true
    }
  } else {
    if(!noTips){
      showToast(e.text)
    }
    throw e
  }
}

/**
 * 解析请求返回数据
 * @param  {object}   //respone对象
 * @return {any}  //请求的返回数据
 */
const parseRespone = (res) => {
  const { dataType, data, errorType, text } = res
  if(dataType){
    if(dataType === 'json'){
      if(!('resultCode' in data)){
        return data
      }else if(data.resultCode === 0){
        return data
      }else if(data.resultMessage){
        throw { ...errors.systemError, text: data.resultMessage }
      }else{
        throw errors.systemError
      }
    }else if(dataType === 'text' && data.indexOf('<!DOCTYPE html>') >= 0){
      throw errors.loginTimeout
    }else{
      return data
    }
  }else{
    throw res
  }
}

/**
 * 发起GET方式的http请求
 * @param  {string}  url  请求的url，不包含前缀以及参数，如：StudentController/editStudent.do
 * @param  {object?}  params  对象形式的参数
 * @param  {boolean?}  noTips  是否不显示错误提示
 * @return {Promise}
 */
async function httpGet({ url, params }, noTips){
  const qs = makeQueryString(params)
  try{
    const res = await request(urlBase + url + (qs ? '?' + qs : ''), { method: 'GET' })
    return parseRespone(res)
  }catch(e){
    handleError(e, noTips)
  }
}

/**
 * 发起POST方式的http请求
 * @param  {string}  url  请求的url，不包含前缀，如：StudentController/editStudent.do
 * @param  {object?}  params  对象形式的参数
 * @param  {boolean?}  noTips  是否不显示错误提示
 * @return {Promise}
 */
async function httpPost({ url, params, dataType }, noTips){
  try{
    let options = {
      method: 'POST',
    }
    if(dataType === 'json'){
      options = {
        ...options,
        body: JSON.stringify(params),
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
      }
    }else{
      options = {
        ...options,
        body: makeQueryString(params),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
      }
    }
    const res = await request(urlBase + url, options)
    return parseRespone(res)
  }catch(e){
    handleError(e, noTips)
  }
}

/**
 * 发起GET方式的http请求
 * @param  {string}  url  请求的url，包含前缀以及参数
 * @param  {object?}  params  对象形式的参数
 * @param  {boolean?}  noTips  是否不显示错误提示
 * @return {Promise}
 */
async function fetchGet({ url, params, headers }, handleError) {
  try {
    const qs = makeQueryString(params);
    let options = { method: 'GET' };
    if (headers) {
      options.headers = { ...headers };
    }
    const rsp = await request(url + (qs ? '?' + qs : ''), options);
    return rsp.data;
  } catch(err) {
    if (handleError) {
      handleError(err);
    } else {
      throw err;
    }
  }
}
/**
 * 发起POST方式的http请求
 * @param  {string}  url  请求的url，包含前缀
 * @param  {object?}  params  对象形式的参数
 * @param  {boolean?}  noTips  是否不显示错误提示
 * @return {Promise}
 */
async function fetchPost({ url, params, dataType, headers }, handleError) {
  try {
    let options = { method: 'POST' };
    let body = null;
    let contentType = '';
    if (dataType === 'json') {
      body = JSON.stringify(params);
      contentType = 'application/json;charset=utf-8';
    } else {
      body = makeQueryString(params);
      contentType = 'application/x-www-form-urlencoded';
    }
    options.body = body;
    options.headers = headers ? { 'Content-Type': contentType, ...headers, } : { 'Content-Type': contentType };
    const rsp = await request(url, options);
    return rsp.data;
  } catch(err) {
    if (handleError) {
      handleError(err);
    } else {
      throw err;
    }
  }
}

export default {
  httpGet,
  httpPost,
  makeQueryString,
  fetchGet,
  fetchPost,
}
