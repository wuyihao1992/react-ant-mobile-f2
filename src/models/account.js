import { routerRedux } from 'dva/router'
import { login, getLoginUserInfo, getButtonAuthTags, getUserToken, getCookieCallsPhoneCheckFail, existUserId } from 'SERVICE/common'
import { logout } from 'SERVICE/account'
import { urlBase } from 'CONST/config'
import importGrowingio from 'SERVICE/growingio'

/**
 * 将setGlobalForOldPage拆分成几个小的函数
 * 暂时保留setGlobalForOldPage，待确认无辅助用后删除
 * */
const _setGlobalForOldPage = (currentLoginUser, authFuncBtnTags) => {
  _initGlobal();
  _setGlobalBtnAuth(authFuncBtnTags);
  _setGlobalUserInfo(currentLoginUser);
};
const _initGlobal = () => {
  if(!global.Index){
    global.Index = {
      dataDictCacheMap: {},
      userToken: null,
    };
  } else {
    global.Index.dataDictCacheMap = {};
    global.Index.userToken = null;
  }
};
const _setGlobalBtnAuth = (authFuncBtnTags) => {
  global.Index.authFuncBtnTags = authFuncBtnTags;
};
const _setGlobalUserInfo = (currentLoginUser) => {
  const isCurrentUserBlBrench = currentLoginUser.isBlBrench === 'true';
  const isCurrentUserBlCampus = currentLoginUser.isBlCampus === 'true';
  global.Index = {
    ...global.Index,
    currentLoginUser,
    getLoginUser: () => currentLoginUser,
    isCurrentUserBlGroup: () => {
      return !isCurrentUserBlBrench && !isCurrentUserBlCampus
    },
    isCurrentUserBlBrench: () => {
      return isCurrentUserBlBrench
    },
    isCurrentUserBlCampus: () => {
      return isCurrentUserBlCampus
    },
  };
};

function filterUserInfo(user) {
  let roleNames = user.roleName ? user.roleName.split(",") : [];
  let roleIds = user.roleId ? user.roleId.split(",") : [];

  const filterList = [
    "紧急状态管理员",
  ];

  roleNames = roleNames.filter((ele, i) => {
    const  isFiltered = filterList.indexOf(ele) > -1;
    if(isFiltered){
      roleIds = [
        ...roleIds.slice(0,i),
        ...roleIds.slice(i+1),
      ]
    }
    return !isFiltered;
  });

  return {
    ...user,
    roleName: roleNames.join(','),
    roleId: roleIds.join(','),
  }
}

/**
 * 登录账户模块，处理登录、用户信息、按钮权限等账户相关数据和逻辑
 */
export default {
  namespace: 'account',
  state: {
    isLogin: false,  //是否已登录
    user: {},   //当前登录用户信息
    btnAuths: [],  //当前登录用户的按钮权限
    loginError: false,  //登录错误
  },
  reducers: {
    /**
     * 更新状态
     * @param  {object} payload 需要更新的状态键值对
     */
    updateState(state, { payload }) {
      return { ...state, ...payload }
    },
  },
  effects: {
    /**
     * 获取用户信息
     */
    *getUserInfo(action, { call, put }) {
      const [user, authFuncBtnTags] = yield [
        call(getLoginUserInfo, {}, true),
        call(getButtonAuthTags, {}, true),
      ]

      // console.log(user)
      // 引入 growingio
      importGrowingio(user)

      yield put({
        type: 'updateState',
        payload: {
          isLogin: true,
        }
      })
      _setGlobalForOldPage(user, authFuncBtnTags)
      yield put({
        type: 'updateState',
        payload: {
          user: filterUserInfo(user),
          btnAuths: authFuncBtnTags.split(',')
        }
      })

      const roleCodes = user.roleCode
      if (roleCodes.indexOf('RECEPTIONIST') != -1 || roleCodes.indexOf('CONSULTOR') != -1 || roleCodes.indexOf('STUDY_MANAGER') != -1) {
        const userToken = yield call(getUserToken)
        if (!window.WebSocket){
          alert('WebSocket not supported by this browser!')
        }

        const sendData = '[{"oper": "login", "data": "' + userToken + '"}]'
        const ws = new WebSocket('ws://127.0.0.1:1818')
        ws.onerror = function(evt) {
          // console.log('error', evt)
          if (evt.data) {
            alert(evt.data)
          } else {
            console.log('连接电话机失败,请检查是否安装电话机连接软件并且运行')
          }
        },
        ws.onopen = function (evt) {
          ws.send(sendData)
          ws.close()
        }
        //获取来电token验证失败的数据，同时打开新窗体输入客户信息
        const map = yield call(getCookieCallsPhoneCheckFail)
        if (map) {
          map.forEach(key => {
            const value = map[key]
            const callsPhonePage = urlBase + 'phoneCustomer.html'
            const url = callsPhonePage + '?phoneNumber='+ key + '&callsTime=' + value + '&token=' + userToken
            window.open(url)
          })
        }
      }

      /**
       * 轮询检测是否需要紧急登出
       */
      setInterval(() => {
        existUserId({ userId: user.userId }, true).then((exist) => {
          if(!exist){
            logout()
          }
        })
      }, 30000)

    },
    /**
     * 登录
     */
    *login({ payload: { code } }, { call, put }) {
      const res = yield call(login, { code })
      if (res) {
        sessionStorage.logined = 'true'
        yield put(routerRedux.push('/'))
      } else {
        yield put({
          type: 'updateState',
          payload: {
            loginError: true,
          }
        })
      }
    },
    /**
     * 更新当前用户按钮权限配置
     * */
    * updateBtnAuth(action, { call, put }) {
      const authFuncBtnTags = yield call(getButtonAuthTags, {}, true);
      _setGlobalBtnAuth(authFuncBtnTags);
      yield put({
        type: 'updateState',
        payload: {
          btnAuths: authFuncBtnTags.split(',')
        },
      });
    },

  },
}
