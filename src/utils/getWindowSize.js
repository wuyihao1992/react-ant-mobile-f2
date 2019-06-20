/**
 * 获取窗口宽高
 */
const getWindowSize = () => {
  let width
  let height
  // 获取窗口宽度
  if (window.innerWidth){
    width = window.innerWidth
  }else if((document.body) && (document.body.clientWidth)){
    width = document.body.clientWidth
  }
  // 获取窗口高度
  if (window.innerHeight){
    height = window.innerHeight
  }else if((document.body) && (document.body.clientHeight)){
    height = document.body.clientHeight
  }
  return { width, height }
}

export default getWindowSize
