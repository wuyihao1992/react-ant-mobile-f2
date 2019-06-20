/**
 * 应用初始加载页面，登录状态处理： 1、根据是否已登录判断进入主页或者登录  2、根据url是否包含code参数判断系统自动登录或者跳转至公用登录页面
 */
import React from 'react'
import { connect } from 'dva'
import { gotoLoginPage, logout } from 'SERVICE/account'
import Loading from 'COMPONENT/Loading'
import { parseUrl } from 'UTIL/url'

class EnterPage extends React.Component {

  componentWillMount() {
    const { dispatch } =  this.props;
    const urlInfo = parseUrl()
    if(urlInfo.params && urlInfo.params.code){
      dispatch({
        type: 'account/login',
        payload: { code: urlInfo.params.code },
      })
    }else{
      gotoLoginPage()
    }
  }

  openPage = (params) => {
    const { dispatch } = this.props
    dispatch({
      type: 'main/openPage',
      payload: params,
    })
  }

  render() {
    const { account: { loginError } } = this.props
    let content = <Loading loading={true} size='large' />
    if (!!loginError) {
      content = (
        <div style={{ textAlign: 'center', marginTop: 120 }}>
          <span style={{ margin: '0 5px 0 10px' }}>登录失败，请</span>
          <a href="javascript:;" onClick={logout}>重新登录</a>
        </div>
      )
    }
    return content
  }
}

const mapStateToProps = (state) =>{
  return {
    account: state.account,
  }
}

export default connect(mapStateToProps)(EnterPage)
