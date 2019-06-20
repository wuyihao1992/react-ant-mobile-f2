import React from 'react'
import {routerRedux} from 'dva/router'
import {getMenuList} from 'SERVICE/common'
import {getPathLevel2} from 'UTIL/url'
import {listMyCollection, addMyCollection, delMyCollectionByResId} from 'SERVICE/common'
import staticMenus from 'CONST/menus'
import { clone } from 'lodash';

//为旧页面设置数据
const _setGlobalForOldPage = (menusData) => {
  if (!global.Index) {
    global.Index = {}
  }
  global.Index = {
    ...global.Index,
    menusData
  }
}

/**
 * 主页面模块，处理菜单、标签页、收藏夹等全局性组件的数据和交互逻辑
 */
export default {
  namespace: 'main',
  state: {
    menus: [],  //菜单数据
    tabpanes: [],  //标签页信息
    pageParams: {},  //页面参数
    activeTabId: null,  //当前激活状态的标签页ID
    openedMenuFolderKeys: [],  //单签展开的菜单文件夹（带有子菜单的菜单节点）集合
    collections: [],  //收藏夹数据
    navBarCollectionLoading: false,  //添加或删除收藏操作加载状态
    collectionCommiting: false,  //收藏操作正在提交状态
    modals: [],  // 保存当前打开的所有模态框，用于路由变化时关闭
    menuExpand: true,
    // 共用的临时存储
    sharedStorage: {},
    /**
    * 导出中心相关状态
    * */
    // 文件列表
    exportFileList: [],
    // 文件总数
    exportFileTotal: 0,
    // 文件列表页码数
    exportFile_pageCurrent: 1,
    // 文件列表每页条数
    exportFile_pageSize: 5,
    // 导出成功时气泡提示框
    exportNotice: false,
    isNoticeOpen: false,
  },
  reducers: {
    /**
     * 更新状态
     * @param  {object} payload 需要更新的状态键值对
     */
    updateState(state, {payload}) {
      return {...state, ...payload}
    },

    /**
     * 设置页面参数
     * @param  {string} path 页面路由
     * @param  {object} params 要设置的参数键值对
     * @param  {string} mirrorId 页面镜像ID，传入了则将页面参数保存在mirrors对象中，mirrorId作为key
     */
    setPageParams(state, {payload: {path, params, mirrorId}}) {
      const pathParams = state.pageParams[path]
      let newPathParams = pathParams ? { ...pathParams } : {}
      if (mirrorId) {
        let newMirrors = newPathParams.mirrors ? { ...newPathParams.mirrors } : {}
        newMirrors[mirrorId] = params
        newPathParams = { ...newPathParams, mirrors: newMirrors }
      } else {
        newPathParams = { ...params, mirrors: newPathParams.mirrors }
      }
      return {...state, pageParams: {...state.pageParams, [path]: newPathParams}}
    },

    /**
     * 添加标签页
     * @param {string} id ID
     * @param {string} name 名称
     * @param {string} rurl 旧页面的URL
     * @param {string} newUrl 新页面的URL
     * @param {[object]} pages 标签页下的所有页面
     * @param {string} activePageId 激活状态的页面ID
     * @param {string} menuId 菜单ID
     */
    addTab(state, {payload: {id, name, rurl, newUrl, pages, activePageId, menuId, mirrorId}}) {
      return {
        ...state,
        tabpanes: [...state.tabpanes, {id, name, rurl, newUrl, pages, activePageId, menuId, mirrorId}],
        activeTabId: id,
      }
    },

    /**
     * 更新标签页信息
     * @param {string} id 要更新的标签页ID
     * @param {object} changed 要更新的信息
     */
    updateTab(state, {payload: {id, changed}}) {
      return {
        ...state,
        tabpanes: state.tabpanes.map(tab => {
          if (tab.id === id) {
            return {...tab, ...changed}
          }
          return tab
        }),
      }
    },

    /**
     * 插入标签页
     * @param {number} idx 插入位置序号
     * @param {object} tabInfo 标签页信息
     */
    insertTab(state, {payload: {idx, tabInfo}}) {
      let newTabpanes = [...state.tabpanes]
      newTabpanes.splice(idx, 0, tabInfo)
      console.log(idx, tabInfo, newTabpanes)
      return {
        ...state,
        tabpanes: newTabpanes,
        activeTabId: tabInfo.id,
      }
    },

    /**
     * 选中标签页
     * @param  {string} payload.id  //标签页ID
     */
    selectTab(state, {payload: {id}}) {
      return {
        ...state,
        activeTabId: id,
      }
    },

    /**
     * 删除标签页
     * @param  {string} payload.id  //标签页ID
     */
    removeTab(state, {payload: {id}}) {
      return {...state, tabpanes: state.tabpanes.filter(tab => tab.id !== id)}
    },

    /**
     * 根据菜单ID展开菜单树
     * @param  {string} payload.id 菜单ID
     */
    expandMenuTreeById(state, {payload: {id}}) {
      if (!id) {
        return {...state, openedMenuFolderKeys: []}
      } else {
        const {menus, openedMenuFolderKeys} = state
        let currentMenu = menus.filter(menu => menu.id === id)[0]
        if (currentMenu) {
          const newOpenKeys = []
          let parentId = currentMenu.parentId
          while (parentId !== '-1') {
            newOpenKeys.push(parentId)
            for (let i = 0; i < menus.length; i += 1) {
              if (menus[i].id === parentId) {
                currentMenu = menus[i]
              }
            }
            parentId = currentMenu.parentId
          }
          return {...state, openedMenuFolderKeys: [...newOpenKeys]}
        } else {
          return state
        }
      }
    },

    /**
     * 模态框弹出时保存
     */
    pushModal(state, {payload: {modal}}) {
      return {
        ...state,
        modals: [...state.modals, modal],
      }
    },

    /**
     * 模态框关闭时删除
     */
    popModal(state) {
      return {
        ...state,
        modals: state.modals.slice(0, state.modals.length - 1),
      }
    },
    // 更新文件列表相关数据
    updateExportFile(state, { payload: { type, list, total, pageCurrent } }) {
      let _list = list.map(item => ({
        id: item.id,
        name: item.excelName,
        format: item.extName,
        date: item.updateTime || item.createTime,
        status: item.status,
        filePath: item.excelPath,
      }));
      let exportFileList = type === 'moreData' ? clone(state.exportFileList).concat(_list) : _list;
      return {
        ...state,
        exportFileList,
        exportFileTotal: total,
        exportFile_pageCurrent: pageCurrent,
      };
    },
  },
  effects: {
    /**
     * 主页初始化
     */* init(action, {call, put, select}) {

      yield put({
        type: 'account/getUserInfo',
      })
      yield put({
        type: 'loadMenus',
      })
    },

    /**
     * 刷新当前标签页
     */
    * refreshCurrentTab(action,{call,put,select}){
      const id = yield select(state => state.main.activeTabId)
      yield put({
        type: 'refreshTab',
        payload: {
          id
        }
      })
    },

    /**
     * 刷新标签页
     * @param  {string?} id 标签页ID
     */
    * refreshTab({payload: {id}}, {call, put, select}) {
      const {tabpanes} = yield select(state => state.main)
      const newTabs = tabpanes.map(tab => {
        if (tab.id === id) {
          const {pages, activePageId, ...props} = tab
          const indexPage = pages[0]
          return {
            pages: [{id: indexPage.id, content: React.cloneElement(indexPage.content)}],
            activePageId: indexPage.id,
            ...props,
          }
        }
        return tab
      })
      yield put({
        type: 'updateState',
        payload: {
          tabpanes: tabpanes.map(tab => {
            if (tab.id === id) {
              return {...tab, pages: []}
            }
            return tab
          })
        },
      })
      yield call(
        () => {
          return Promise.resolve()
        }
      )
      yield put({
        type: 'updateState',
        payload: {tabpanes: newTabs},
      })
    },

    /**
     * 刷新页面
     * @param  {string} pathname 页面路由
     * @param  {string?} mirrorId 页面镜像ID
     */
    * refreshPage({payload: {pathname, mirrorId}}, {call, put, select}) {
      const {tabpanes} = yield select(state => state.main)
      let newPageContent
      tabpanes.forEach(tab => {
        if ((mirrorId && tab.newUrl === pathname && mirrorId === tab.mirrorId) || (!mirrorId && getPathLevel2(tab.newUrl) === getPathLevel2(pathname))) {
          const newPages = tab.pages.map(p => {
            if (p.id === pathname) {
              newPageContent = React.cloneElement(p.content)
            }
          })
        }
      })
      if (!newPageContent) {
        return
      }
      yield put({
        type: 'updateState',
        payload: {
          tabpanes: tabpanes.map(tab => {
            if ((mirrorId && tab.newUrl === pathname && mirrorId === tab.mirrorId) || (!mirrorId && getPathLevel2(tab.newUrl) === getPathLevel2(pathname))) {
              const newPages = tab.pages.map(p => {
                if (p.id === pathname) {
                  return {...p, content: ''}
                }
                return p
              })
              return {...tab, pages: newPages}
            }
            return tab
          })
        },
      })
      yield call(
        () => {
          return Promise.resolve()
        }
      )
      const {tabpanes: tabpanes2} = yield select(state => state.main)
      yield put({
        type: 'updateState',
        payload: {
          tabpanes: tabpanes2.map(tab => {
            if ((mirrorId && tab.newUrl === pathname && mirrorId === tab.mirrorId) || (!mirrorId && getPathLevel2(tab.newUrl) === getPathLevel2(pathname))) {
              const newPages = tab.pages.map(p => {
                if (p.id === pathname) {
                  return {...p, content: newPageContent}
                }
                return p
              })
              return {...tab, pages: newPages}
            }
            return tab
          }),
        },
      })
    },

    /**
     * 打开页面
     * @param  {string} path 页面路由
     * @param  {string?} params 页面参数
     * @param  {boolean?} refresh 是否刷新
     * @param  {string?} mirrorId 页面镜像ID，每个页面镜像以新的标签页打开
     */
    * openPage({payload: {path, params, refresh, mirrorId}}, {call, put, select}) {
      yield put({
        type: 'setPageParams',
        payload: {path, params, mirrorId},
      })
      yield put(routerRedux.push({
        pathname: path,
        query: {
          mirrorId,
        },
      }))

      if (refresh) {
        yield put({
          type: 'refreshPage',
          payload: {pathname: path, mirrorId},
        })
      }
    },

    /**
     * 加载菜单数据
     */
    * loadMenus(action, {call, put}) {
      const {datas} = yield call(getMenuList)
      //给旧页面赋值菜单数据
      _setGlobalForOldPage([...datas])
      yield put({
        type: 'updateState',
        payload: {menus: [...datas, ...staticMenus]},
      })
    },

    /**
     * 加载收藏夹数据
     */
    * loadCollections(action, {call, put}) {
      const data = yield call(listMyCollection)
      const collections = Object.keys(data).map(key => {
        return {title: key, items: data[key]}
      })
      yield put({
        type: 'updateState',
        payload: {collections: collections},
      })
    },

    /**
     * 删除收藏
     */
    * deleteCollection({payload: {resId}}, {call, put}) {
      yield put({
        type: 'updateState',
        payload: {collectionCommiting: true},
      })
      yield call(delMyCollectionByResId, {resId})
      yield put({
        type: 'loadCollections'
      })
      yield put({
        type: 'updateState',
        payload: {collectionCommiting: false},
      })
    },

    /**
     * 增加收藏
     */
    * addCollection({payload: {resId}}, {call, put}) {
      yield put({
        type: 'updateState',
        payload: {collectionCommiting: true},
      })
      yield call(addMyCollection, {resId})
      yield put({
        type: 'loadCollections'
      })
      yield put({
        type: 'updateState',
        payload: {collectionCommiting: false},
      })
    },
    /**
     * 导出中心通知
     * */
    // 加载导出中心通知文件列表
    * loadExportFileList({ payload: { type, callback, handleErr } }, { select, put }) {
    },
    // 清空导出中心通知文件列表
    * cleanExportFileList({ payload: { callback, handleErr } }, { put }) {
      if (callback) callback();
    },
    // 重试导出文件
    * reExportFile({ payload: { id, callback, handleErr } }, effects) {
      if (callback) callback();
    },
    // 提示下载导出文件
    * exportNotice(action, { put, select }) {
      let payload = { exportNotice: true };
      payload.isNoticeOpen = yield select(state => state.main.exportNotice);
      yield put({
        type: 'updateState',
        payload,
      });
      yield put({ type: 'closeExportNotice' });
    },
    * closeExportNotice(action, { put, select }) {
      yield new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, 3000);
      });
      let payload = {};
      if (yield select(state => state.main.isNoticeOpen)) {
        payload.isNoticeOpen = false;
      } else {
        payload.exportNotice = false;
      }
      yield put({
        type: 'updateState',
        payload,
      });
    },
  },
}
