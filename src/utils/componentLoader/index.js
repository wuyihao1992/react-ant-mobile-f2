import registerModel from "UTIL/registerModel";

const loadModal = (id) => {
  return new Promise(resolve => {
    switch (id){
      case 'promiseFeeDetail': {
        require.ensure([], () => {  //目标班中途退费
          resolve(require('PAGE/course/modals/PromiseFeeDetail'))
        })
        break
      }
      case 'productImport': {
        require.ensure([], () => { //产品管理导入
          resolve(require('PAGE/product/modals/ProductImport'))
        })
        break
      }
      case 'contractAssignClass': {
        require.ensure([], () => { //合同一对一一对多分配课时
          resolve(require('PAGE/contract/modals/AssignClassModal/index'))
        })
        break
      }
      case 'subjectAssign': {
        require.ensure([], () => { //双师科次分配
          resolve(require('PAGE/contract/modals/SubjectAssign/index'))
        })
        break
      }
      //合同添加产品
      case 'contractAddProduct': {
        require.ensure([], () => {
          registerModel(require('PAGE/contract/ModalAddProduct/store'));
          resolve(require('PAGE/contract/ModalAddProduct/index'));
        });
        break
      }
      case 'prePare':{
        require.ensure([],() => { // 预退班
          resolve(require('PAGE/course/modals/prePareClass/index'))
        })
        break
      }
      case 'cancelPrePare': {
        require.ensure([],() => { // 预退班
          resolve(require('PAGE/course/modals/CancelPrePareClass/index'))
        })
        break
      }
      case 'prepareReason': {
        require.ensure([],() => { // 预退班
          resolve(require('PAGE/course/modals/PrepareReason/index'))
        })
        break
      }
      // 分享支付
      case 'contractSharePayment': {
        require.ensure([], () => {
          registerModel(require('PAGE/contract/SharePayment/store'));
          resolve(require('PAGE/contract/SharePayment/index'));
        });
        break;
      }
      default:
        throw(new Error('ERROR: componentLoader.loadModal id is not existed!'));
    }
  })
};

export {
  loadModal,    //加载模态框
}
