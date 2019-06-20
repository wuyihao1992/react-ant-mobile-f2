/**
*@param {string} url 完整的URL地址
*@returns {object} 自定义的对象
*@description 用法示例：var myURL = parseUrl('http://abc.com:8080/dir/index.html?id=255&m=hello#top');
myURL.file='index.html'

myURL.hash= 'top'

myURL.host= 'abc.com'

myURL.query= '?id=255&m=hello'

myURL.params= Object = { id: 255, m: hello }

myURL.path= '/dir/index.html'

myURL.segments= Array = ['dir', 'index.html']

myURL.port= '8080'

myURL.protocol= 'http'

myURL.source= 'http://abc.com:8080/dir/index.html?id=255&m=hello#top'

*/
function parseUrl(url) {
  if(!url){
    url = window.location.href
  }
  var a = document.createElement('a');
  a.href = url;
  return {
    source: url,
    protocol: a.protocol.replace(':', ''),
    host: a.hostname,
    port: a.port,
    query: a.search,
    params: (function() {
      var ret = {},
        seg = a.search.replace(/^\?/, '').split('&'),
        len = seg.length,
        i = 0,
        s;
      for (; i < len; i++) {
        if (!seg[i]) {
          continue;
        }
        s = seg[i].split('=');
        ret[s[0]] = s[1];
      }
      return ret;
    })(),
    file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
    hash: a.hash.replace('#', ''),
    path: a.pathname.replace(/^([^\/])/, '/$1'),
    relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
    segments: a.pathname.replace(/^\//, '').split('/')
  };
}

/**
 * 获取二级路由
 * @param  {string} path 完整路由
 * @return {string}
 */
const getPathLevel2 = path => path ? ( '/' + path.split('/')[1] ) : null

/**
 * 去除URL中的参数部分
 * @param  {string} url
 * @return {string}
 */
const urlWithoutParam = url => url ? url.split('?')[0] : null

export default {
  parseUrl,
  getPathLevel2,
  urlWithoutParam,
}




