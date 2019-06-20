import React from 'react'
import styles from './style.less'
import showMessage from 'COMPONENT/utils/globalTips/showMessage'
import showConfirm from 'COMPONENT/utils/globalTips/showConfirm'
import fetch from 'dva/fetch'
import {urlBase} from 'CONST/config'
import {readFile} from 'COMPONENT/utils/file/imgCompress'
import {getSseKey} from 'SERVICE/common'
import {uuid} from 'COMPONENT/utils/basic/str'
import {Spin, Icon, Progress} from 'antd'

import uploadImg from './upload_img.png'

const document = window.document;
const maxSize = 200 * 1024;
const maxLength = 960;

class MobileFileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgPath: null,
      canvas: null,
      file: null,
      loading: false,
      lastFile: null
    };
    this.complete = 0;
    this.getFile = this.getFile.bind(this);
    this.back = this.back.bind(this);
    this.deleteImg = this.deleteImg.bind(this);
    // this.uploadImg = this.uploadImg.bind(this);
  }

  async getFile(e) {
    let {multiple} = this.props.location.query;
    if (!multiple) {
      const file = e.target.files[0];
      const {imgPath, canvas, typeError} = await readFile(file, maxSize, maxLength);
      if (typeError) {
        showMessage('文件类型错误，请选择图片');
      } else {
        this.setState({imgPath, canvas, file});
      }
    } else {
      let {imgPathArray = []} = this.state;
      [...e.target.files].forEach(async (file, k) => {
        const {imgPath, canvas, typeError} = await readFile(file, maxSize, maxLength);
        if (typeError) {
          showMessage('文件类型错误，请选择图片');
        } else {
          imgPathArray.push({imgPath, canvas, file});
          this.setState({imgPathArray});
        }
      })
    }
  }

  back() {
    this.setState({imgPath: null})
  }

  deleteImg() {
    const id = this.props.location.query.id;
    const lastFile = this.state.lastFile;
    return fetch(`${urlBase}MobileInterface/deleteOSSFile.do?filePath=${lastFile}&uploadType=PC&uploadId=${id}`, {method: "delete"})
  }

  uploadImg = async () => {
    let {multiple} = this.props.location.query;
    if (multiple) {
      const ossConfig = await getSseKey();
      let {imgPathArray} = this.state;
      this.setState({disabled: true});
      for (let fileItem of imgPathArray) {
        const {canvas, file} = fileItem;
        if (canvas) {
          try {
            canvas.toBlob(blob => {
              this.multipleUploadRequest(blob, file, ossConfig);
            }, file.type);
          } catch (e) {
            alert(e)
          }
        } else {
          this.multipleUploadRequest(file, file, ossConfig);
        }
      }
    } else {
      //上传单张
      this.setState({loading: true});
      this.deleteImg().then(res => {
        const {canvas, file} = this.state;
        if (canvas) {
          try {
            canvas.toBlob(blob => {
              this.uploadRequest(blob);
            }, file.type);
          } catch (e) {
            alert(e)
          }
        } else {
          this.uploadRequest(file);
        }
      })
    }
  }
  multipleDeleteImg = (index) => {
    let {imgPathArray} = this.state;
    imgPathArray.splice(index, 1);
    this.setState({imgPathArray});
  }
  multipleUploadRequest = (uploadData, file, ossConfig) => {
    let {imgPathArray} = this.state;
    let len = imgPathArray.length;
    const realname = /\.(?:png|jpg|jpeg)$/gi.test(file.name) ? file.name : file.name + '.' + file.type;
    const id = this.props.location.query.id;
    const fileKey = uuid();
    let formData = new FormData();
    formData.append('x:realname', realname);
    formData.append('x:uploadid', id);
    formData.append('x:uploadtype', 'H5');
    formData.append('key', fileKey);

    Object.keys(ossConfig).forEach((key, index) => {
      if (key != 'host') formData.append(key, ossConfig[key]);
    });

    formData.append('file', uploadData);
    this.setState({showProgress: true});
    fetch(ossConfig.host, {method: "POST", body: formData, mode: 'cors'}).then(res => {
      this.complete++;
      this.setState({percent: this.complete * 100 / len});
      if (this.complete === len) {
        setTimeout(() => {
          this.setState({viewModal: true,disabled:false});
          setTimeout(()=>{
            this.complete = 0;
            this.setState({imgPathArray: [], viewModal: false, showProgress: false, percent: 0});
          },2000)
        }, 200)
      }

    })
      .catch(error => {
        this.setState({loading: false});
        showMessage('上传失败!');
      });
  }

  async uploadRequest(uploadData) {
    const {file} = this.state;
    const realname = /\.(?:png|jpg|jpeg)$/gi.test(file.name) ? file.name : file.name + '.' + file.type;
    const id = this.props.location.query.id;
    const fileKey = uuid();
    let formData = new FormData();
    formData.append('x:realname', realname);
    formData.append('x:uploadid', id);
    formData.append('x:uploadtype', 'H5');
    formData.append('key', fileKey);

    const ossConfig = await getSseKey();
    Object.keys(ossConfig).forEach((key, index) => {
      if (key != 'host') formData.append(key, ossConfig[key]);
    });

    formData.append('file', uploadData);

    fetch(ossConfig.host, {method: "POST", body: formData, mode: 'cors'}).then(res => {
      this.setState({loading: false});
      this.setState({lastFile: fileKey});
      showMessage('上传成功!', 'success');
    })
      .catch(error => {
        this.setState({loading: false});
        showMessage('上传失败!');
      });
  }

  checkSure = () => {

  }

  render() {
    const {location} = this.props;
    let {multiple} = this.props.location.query;
    const {files, imgPath, loading, imgPathArray = [], percent, showProgress, viewModal = false, disabled} = this.state;
    return (
      <div className={'mobileFileUpload ' + (multiple ? 'background' : '')}>
        <div>
          {(!imgPath && !multiple) &&
          <label htmlFor="attachFile" className='uploadLabel'>
            <img src={uploadImg} alt=''/>
            <input type="file" multiple={multiple} accept="image/*" id="attachFile" name="attachFile"
                   onChange={this.getFile}/>
            <p>点击上传图片</p>
          </label>
          }
          {(!!imgPath && !multiple) &&
          <div>
            <Spin spinning={loading} tip="上传中...">
              <div className='filePreview'>
                <img src={imgPath} alt=''/>
              </div>
            </Spin>
            <div className='bottomBar'>
              <button className='deleteBtn' onClick={this.back}>返回</button>
              <button className='uploadBtn' onClick={this.uploadImg}>上传图片</button>
            </div>
          </div>
          }
          {multiple &&
          <div className='mobileMultiple'>
            <div className='multiplePreview'>
              {
                imgPathArray.map((v, k) => {
                  return (
                    <div key={k}>
                      <img src={v.imgPath} alt=""/>
                      <span onClick={e => this.multipleDeleteImg(k)} style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        height: 30,
                        width: 30,
                        textAlign: 'center',
                        lineHeight: '30px',
                        background: 'rgba(0,0,0,.2)'
                      }}>
                            <Icon type="delete"/>
                          </span>
                    </div>
                  )
                })
              }
              {imgPathArray.length < 9 &&
              <div>
                <label htmlFor="attachFile">
                  <input type="file" style={{display: 'none'}} multiple={multiple} accept="image/*" id="attachFile"
                         name="attachFile" onChange={this.getFile}/>
                  <div>
                    <Icon type="plus" style={{fontSize: 40}}/>
                  </div>
                </label>
              </div>
              }

            </div>
            {showProgress &&
            <Progress showInfo={false} percent={percent} strokeWidth={5}/>
            }
            {imgPathArray.length > 0 &&
            <div className='bottomBar'>
              {/*<button className='deleteBtn' onClick={this.back}>返回</button>*/}
              <button className='uploadBtn' onClick={this.uploadImg} disabled={disabled}>上传图片</button>
            </div>
            }
          </div>
          }
          {viewModal &&
          <div className="mobileMask">
            <div className='modal'>
              <p>上传成功</p>
            </div>
          </div>
          }
        </div>
      </div>
    );
  }
}

export default MobileFileUpload;
