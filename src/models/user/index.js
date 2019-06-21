import { routerRedux } from 'dva/router'

/**
 * 处理登录用户逻辑
 */
export default {
    namespace: 'user',
    state: {
        isLogin: false, // 是否已登录
        userInfo: {},   // 当前登录用户信息
    },
    reducers: {
        /**
         * 更新状态
         * @param state
         * @param  {object} payload 需要更新的状态键值对
         */
        updateState(state, { payload }) {
            return { ...state, ...payload }
        },
    },
    effects: {

    }
}
