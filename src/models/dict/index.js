/**
 * 格式化普通字典
 */
const formateDict = ({ value }) => {
  let dict = []
  Object.keys(value).forEach(key => {
    if(key){
      dict.push({val: key, text: value[key]})
    }
  });
  return dict
};

/**
 * 将普通字典格式化为分组字典
 * @param  {[object]} dict 将被分组的字典，格式如下：
  [{
    val: string  选项值
    text: string  选项文本
    [groupKeyName]: string  用于分组的字段，默认为'groupName'
    groupSort: number  分组的顺序
  }]
 * @param  {string} groupKeyName 用于分组的字段名
 * @return {[object]} 分组后的字典，格式如下：
   [{
    label: string  组名
    options:  一个组下面的选项
    [{
      val: string  选项值
      text: string  选项文本
    }]
   }]

 */
const formatGroupDict = (dict, groupKeyName) => {
  groupKeyName = groupKeyName || 'groupName'
  let groupDict = []
  if (dict) {
    dict.forEach(d => {
      const newOption = { ...d }
      const label = d[groupKeyName]
      let group = groupDict.find(g => g.label === label)
      if(group){
        group.options = [...group.options, newOption]
      }else{
        groupDict.push({
          label,
          options: [newOption],
          groupSort: d.groupSort,
        })
      }
    })
  }
  groupDict.sort((a, b) => a.groupSort > b.groupSort)
  return groupDict
};

/**
 * 将行政区划数据格式化为城市字典
 */
const formateCityDict = (data, provinceId) => {
  if(!data || !provinceId){
    return []
  }
  const province = data.filter(item => item.id === provinceId)[0]
  let dict = []
  if(province && province.children){
    dict = province.children.map(item => {
      return {val: item.id, text: item.name}
    })
  }
  return dict
};

/**
 * 将后台返回的数据转换为符合select组件的数据格式
 * @param data
 * @returns {Array}
 */
let mapDataToDict=(data)=>{
  let dict = Object.values(data).map((v, k) => {
    return {
      text: v,
      val: Object.keys(data)[k]
    }
  });
  let cleacDict=dict.filter((v,k)=>{
    return v.val !=='';
  });
  return cleacDict;
};

export {
  formateDict,
  formatGroupDict,
  mapDataToDict,
}
