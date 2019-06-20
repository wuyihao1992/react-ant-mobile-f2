import { parseUrl } from 'UTIL/url'

if(!global.__BOSS__BAIDU__MAP__API__LOADER){
  global.__BOSS__BAIDU__MAP__API__LOADER = {
    callbacks: [],
    loadBMap: (callback) => {
      __BOSS__BAIDU__MAP__API__LOADER.callbacks.push(callback)
      if(!('BMap' in global) && !__BOSS__BAIDU__MAP__API__LOADER.loading){
        __BOSS__BAIDU__MAP__API__LOADER.loading = true
        const $script = document.createElement('script')
        const protocol = parseUrl().protocol
        console.log(protocol)
        $script.src = protocol + '://api.map.baidu.com/api?v=2.0&ak=bHIcux5jImQGio3a0Nhwau1s&callback=__BOSS__BAIDU__MAP__API__LOADER._loadBMapCallback'
        document.body.appendChild($script)
      }
    },
    _loadBMapCallback: () => {
      __BOSS__BAIDU__MAP__API__LOADER.loading = false
      __BOSS__BAIDU__MAP__API__LOADER.callbacks.forEach(cb => {
        if(cb){
          cb()
        }
      })
    },
  }
}

__BOSS__BAIDU__MAP__API__LOADER.loadBMap()

/**
 * 初始化基础地图API
 * @param {[string]?} libs 附加库，如热力图'heatMap'
 * @return {Promise}
 */
const init = (libs) => {
  const onBMapLoaded = (resolve) => {
    if(libs){
      if(libs.indexOf('heatMap') >= 0){
        require.ensure([], () => {
          const heatMap = require('./heatMap')
          heatMap.init().then(() => {
            resolve()
          })
        })
      }else{
        resolve()
      }
    }else{
      resolve()
    }
  }
  return new Promise((resolve) => {
    if('BMap' in global){
      onBMapLoaded(resolve)
    }else{
      __BOSS__BAIDU__MAP__API__LOADER.loadBMap(() => onBMapLoaded(resolve))
    }
  })
}

export default {
  init,
}
