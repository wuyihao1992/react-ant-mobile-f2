# 数据字典请求管理

## 配置

在`config.js`文件中对数据字典名称及加载方法进行配置

```javascript
const dictConfig = {
  key: function (){},
};
```

其中key为我们对数据字典的命名，在获取数据字典时会用到，
function为请求数据字典接口的函数，返回一个Promise。

`为了便于大家使用，请记得加上注释`

例子：
```javascript
const dictConfig = {
  // 分公司
  branch: loadBranchDict,
  //产品类型
  productType() {
    return loadCommonDict('PRODUCT_TYPE');
  },
  /**
    * 班级类型
    * @param type string (e.g. 'TWO_TEACHER')
    * */
  classType(type) {
    return loadCommonDict('CLASS_TYPE', type);
  },
};
```


## 使用

```javascript
// 初始化数据字典
this.props.dispatch({
  type: 'dict/initDict',
  payload: {
    list: [
      'branch', 'year', { name: 'classType', params: 'LECTURE'}
    ],
    callback() {
      // do something when initDict complete
    }
  },
});
// 取数据字典
const mapStateToProps = (state) => {
  return {
    branchDict: state.dict.branch,
    yearDict: state.dict.year,
    classTypeDict: state.dict.classType ? state.dict.classType['LECTURE'] : null,
  };
};
```

`payload`中的list属性为要初始化的数据字典数组，`list`的每一项可传一个`string`或者`object`；

传`string`：数据字典name，对应config中配置好的key值，以这种形式可以直接获取到数据字典；

传`object`：该对象有两个属性（name: 数据字典名，params: 参数），以这种形式接获到的数据是一个object，下面的key（对应params）对应的value才是数据字典；


