/**
 * Created by Haolin<haolinhom@gmail.com> on 2019/2/14.
 */
import showMessage from 'COMPONENT/utils/globalTips/showMessage';

const file = {
  name: 'file',
  /**
   * 下载文件
   * @param { string, required } url 下载的文件连接
   * @param { string } fileName 文件名
   * @param { string } format 文件格式(文件后缀)
   * @return Promise
   * */
  download({ url, fileName, format }) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.responseType = 'blob';
      xhr.onload = () => {
        const link = document.createElement('a');
        const body = document.body;
        link.href = window.URL.createObjectURL(xhr.response);
        let file = fileName || 'download';
        if (format) file = `${file}.${format}`;
        link.download = decodeURIComponent(file);
        link.style.display = 'none';
        body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(link.href);
        body.removeChild(link);
        showMessage('下载成功', 'success');
        resolve(true);
      };
      xhr.onerror = () => {
        showMessage('下载失败', 'error');
        resolve(false);
      };
      xhr.send();
    });
  },
  downloadDirect() {},
};

export default file;
