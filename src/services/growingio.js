/**
 * 数据分析
 * @param user
 */
let importGrowingio = function(user){
  let userId = user.userId + '0';
  let script = document.getElementById('growingIO')
  if(!script){
    let script = document.createElement('script')
    script.setAttribute('id','growingIO')
    script.setAttribute('type', 'text/javascript')
    script.innerHTML = `
      !function(e,t,n,g,i){e[i]=e[i]||function(){(e[i].q=e[i].q||[]).push(arguments)},n=t.createElement("script"),tag=t.getElementsByTagName("script")[0],n.async=1,n.src=('https:'==document.location.protocol?'https://':'http://')+g,tag.parentNode.insertBefore(n,tag)}(window,document,"script","assets.growingio.com/2.1/gio.js","gio");
      gio('init', 'aace305c8b58ec2e', {});
      gio('people.set', 'loginUserId', '${userId}');
      gio('setUserId', '${userId}'); 
      gio('send');
    `
    document.getElementsByTagName('body')[0].appendChild(script);
  }
}

export default importGrowingio;
