/**
 * Created by Haolin<haolinhom@gmail.com> on 2019/1/24.
 */
import { urlBase } from 'CONST/config'
import showMessage from 'COMPONENT/utils/globalTips/showMessage';

const makeQueryString = (params) => {
  let queryString = '';
  if(params){
    Object.keys(params).forEach((key, i) => {
      const value = params[key];
      if(i > 0){
        queryString += '&';
      }
      queryString += `${key}=${value === null || value == undefined ? '' : value}`;
    })
  }
  return queryString;
};

const urlCheckConfig = ['http', 'https', 'ftp', 'www'];

const exportFile = {
  name: 'exportFile',
  post({url, params, fileName, fileExtension}) {
    return new Promise((resolve, reject)=>{
      let checkUrl = urlCheckConfig.findIndex(item => item.indexOf(url) !== -1) === -1;
      let _url = checkUrl ? urlBase + url : url;
      let xhr = new XMLHttpRequest();
      xhr.open('POST', _url, true);
      xhr.responseType = "blob";
      xhr.setRequestHeader("Content-type", "application/json");
      xhr.onload = function(){
        if (this.status === 200) {
          let blob = this.response;
          let reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onload = function(event){
            let a = document.createElement("a");
            a.href = window.URL.createObjectURL(xhr.response);
            a.download = `${fileName}.${fileExtension}`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            showMessage('导出成功！', 'success');
          };
          resolve(true);
        } else {
          let reader = new FileReader();
          reader.addEventListener('loadend',(event)=>{
            let text = event.srcElement.result;
            reject(JSON.parse(text));
          });
          reader.readAsText(this.response);
        }
      };
      xhr.onerror = (err)=>{
        showMessage('导出失败！', 'error');
        resolve(false);
      };
      xhr.send(JSON.stringify(params))
    })
  },
  get({url, params, fileName, fileExtension}) {
    return new Promise((resolve, reject) => {
      let checkUrl = urlCheckConfig.findIndex(item => item.indexOf(url) !== -1) === -1;
      let _url = checkUrl ? urlBase + url : url;
      if (params && params !== '') {
        _url = `${url}?${makeQueryString(params)}`;
      }
      const xhr = new XMLHttpRequest();
      xhr.open('GET', _url);
      xhr.responseType = 'blob';
      xhr.onload = () => {
        if (xhr.status === 200) {
          const link = document.createElement('a');
          const body = document.body;
          link.href = window.URL.createObjectURL(xhr.response);
          link.download = decodeURIComponent(`${fileName}.${fileExtension}`);
          link.style.display = 'none';
          body.appendChild(link);
          link.click();
          window.URL.revokeObjectURL(link.href);
          body.removeChild(link);
          showMessage('导出成功！', 'success');
          resolve(true);
        } else {
          showMessage(`导出失败！`, 'error');
          resolve(false);
        }
      };
      xhr.onerror = (err) => {
        showMessage(`导出失败！`, 'error');
        resolve(false);
      };
      xhr.send();
    });
  },
};

export default exportFile;
