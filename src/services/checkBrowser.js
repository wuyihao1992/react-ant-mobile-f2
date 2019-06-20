export default function(){
  const isChrome = !!window.chrome;
  if(!isChrome && /Android|webOS|iPhone|iPad|BlackBerry/i.test(navigator.userAgent) !== true){
        alert('请使用谷歌浏览器访问本网站。')
        var opened = window.open('about:blank', '_self');
        opened.opener = null;
        opened.close();
  }
}
