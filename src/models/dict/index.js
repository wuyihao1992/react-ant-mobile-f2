/**
 * Created by Haolin<haolinhom@gmail.com> on 2018/12/26.
 */
import dictConfig from './config.js';
import showMessage from "COMPONENT/messenger/showMessage";

const _fn = {
  // 请求所需的数据字典
  initDict(dictList) {
    return new Promise(async (resolve, reject) => {
      let fetchList = [];
      dictList.forEach((item) => {
        fetchList.push(!item.data ? dictConfig[item.name](item.params) : item.data);
      });
      const rspDictList = await Promise.all(fetchList).catch((err) => {
        reject(err);
      });
      let dict = null;
      if (rspDictList) {
        dict = [];
        dictList.forEach((item, index) => {
          dict.push({
            name: item.name,
            val: rspDictList[index],
            childName: item.params || null,
          });
        });
      }
      resolve(dict);
    });
  },
};

/**
 * 数据字典管理
 * */
let dict = {
  namespace: 'dict',
  state: {},
  reducers: {
    // 更新state
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
    // 更新字典(配合initDict)
    updateDict(state, { payload }) {
      let dictObj = {};
      payload.forEach((item) => {
        if (item.childName) {
          dictObj[item.name] = {
            ...state[item.name],
            ...dictObj[item.name],
            [item.childName]: item.val,
          };
        } else {
          dictObj[item.name] = item.val;
        }
      });
      return {
        ...state,
        ...dictObj,
      }
    },
  },
  effects: {
    /**
     * 初始化数据字典
     * */
      * initDict({ payload: { list, callback, handleErr } }, { put, select }) {
      if (list.length > 0) {
        const dictList = yield select((state) => {
          return list.map((item) => {
            return typeof item === 'string' ? {
              name: item,
              data: state.dict[item],
              params: null,
            } : {
              name: item.name,
              data: state.dict[item.name] ? state.dict[item.name][item.params] : null,
              params: item.params,
            };
          });
        });
        const dict = yield _fn.initDict(dictList).catch((err) => {
          showMessage(`加载数据字典错误：${err.text}`, 'error');
          if (handleErr) handleErr();
        });
        if (dict) {
          yield put({
            type: 'updateDict',
            payload: dict,
          });
        }
      }
      if (callback) callback();
    },
  },
};
// 初始化state
Object.keys(dictConfig).forEach((item) => {
  dict.state[item] = null;
});

export default dict
