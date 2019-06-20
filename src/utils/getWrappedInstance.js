/**
 * 获取被高阶组件包裹的原始组件，目前仅处理redux的connect、antd的Form.create
 * @param  {ReactComponent} component 包裹后的组件
 * @return {ReactComponent} 包裹前的原始组件
 */
const getWrappedInstance = (component) => {
  if (!component) {
    return null
  }
  let wrappedComp
  const { refs } = component
  if(refs){
    const { wrappedInstance, wrappedComponent } = refs
    if(wrappedInstance){
      wrappedComp = wrappedInstance
    }
    if(wrappedComponent && wrappedComponent.refs && wrappedComponent.refs.formWrappedComponent){
      wrappedComp = wrappedComponent.refs.formWrappedComponent
    }
  }
  if(wrappedComp){
    return getWrappedInstance(wrappedComp)
  }else{
    return component
  }
}

export default getWrappedInstance
