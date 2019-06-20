import {
  getSelectOption, selectOrgByIdAndTypeOption, getBrenchForSelection, getRegionList,
  getCampusByLoginUser, getAllCampusForSelection, getSmallClassTcDict, getUserByRoldCodesSelection} from 'SERVICE/common'
import { uniqBy } from 'lodash';

/**
 * 格式化普通字典
 */
const formateDict = ({ value }) => {
  let dict = []
  Object.keys(value).forEach(key => {
    if(key){
      dict.push({val: key, text: value[key]})
    }
  })
  return dict
}

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
}

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
}

/**
 * 加载按省份分组的城市字典
 * @param  {boolean} isFull  - 是否完整版，即包含直辖市、直辖县、港澳台
 * @return {object[]}
 */
const loadProvinceCityDict = async (isFull) => {
  let directCity = []  //直辖市
  let directCounty = []  //直辖县
  let special = []  //港澳台
  if (!isFull) {
    directCity = ['110000', '120000', '310000', '500000']
    directCounty = ['139000', '419000', '429000', '469000', '659000']
    special = ['710000', '810000', '820000']
  }
  const data = await getRegionList({}, true)
  const dict = data.map(province => {
    let citys = []
    if(province.children){
      province.children.forEach(city => {
        if (directCounty.indexOf(city.id) < 0) {
          citys.push({ val: city.id, text: city.name })
        }
      })
    }
    if ([...directCity, ...special].indexOf(province.id) >= 0) {
      return { val: province.id, text: province.name }
    } else {
      return { val: province.id, label: province.name, options: citys }
    }
  })
  return dict
}

/**
 * 根据省份获取城市字典
 * @param  {object[]} groupDict - 省份城市分组字典
 * @param  {string} provinceId  - 省份ID
 * @return {object[]}
 */
const getCityDictByProvince = (groupDict, provinceId) => {
  let dict = []
  if (groupDict && provinceId) {
    const group = groupDict.find(g => g.val === provinceId)
    if (group) {
      dict = group.options
    }
  }
  return dict
}


/**
 * 加载公共字典
 * @param {string} name 字典名称
 */
const loadCommonDict = async (name,type) => {
  try {
    const data = await getSelectOption({ selectOptionCategory: name ,parentId:type}, true)
    return formateDict(data)
  } catch (e) {
    return []
  }
}

/**
 * 加载当前用户所属分公司字典
 */
const loadBranchDict = async () => {
  const data = await selectOrgByIdAndTypeOption({ orgType: 'BRENCH' }, true)
  return formateDict(data)
}

/**
 * 加载校区字典
 * @param {string} branch 分公司
 */
const loadCampusDict = async (branch) => {
  const data = await selectOrgByIdAndTypeOption({ orgType: 'CAMPUS', orgId: branch })
  return formateDict(data)
}

/**
 * 加载所有分公司字典
 */
const loadAllBranchDict = async () => {
  const data = await getBrenchForSelection({}, true)
  return formateDict(data)
}

/**
 * 加载当前用户所属校区按分公司分组字典
 */
const loadBranchCampusDict = async () => {
  const data = await getCampusByLoginUser({}, true)
  return data.map(group => {
    const branch = group[0] || {}
    const campuses = group && group.length > 1 ? group.slice(1) : []
    return {
      val: branch.id, label: branch.name,
      options: campuses.map(d => {
        return { val: d.id, text: d.name }
      })
    }
  })
}

/**
 * 加载所有校区按分公司分组字典
 */
const loadAllBranchCampusDict = async () => {
  const data = await getAllCampusForSelection({}, true)
  let dict = []
  data.forEach(d => {
    const opt = { val: d.orgId, text: d.orgName }
    const branchId = d.orgParentId
    let group = dict.find(v => v.val === branchId)
    if (!!group) {
      group.options.push(opt)
    } else {
      dict.push({ val: branchId, label: d.orgParentName, options: [opt] })
    }
  })
  return dict
}

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
  })
  let cleacDict=dict.filter((v,k)=>{
    return v.val !=='';
  })
  return cleacDict;
}

/**
 * 字典选项添加标题
 */
const dictAddOptionTitle = dict => {
  if (!dict) {
    return null
  }
  return dict.map(d => {
    if (d.label) {
      return {
        ...d, title: d.text,
        options: d.options ? d.options.map(opt => {
          return { ...opt, title: opt.text }
        }) : null
      }
    } else {
      return { ...d, title: d.text }
    }
  })
}
/**
 * 加载小班授课老师数据
 */
const loadSmallClassTcDict = async (params) => {
  const data = await getSmallClassTcDict(params)
  const teachers = data.map(tc => {
    return {
      text: tc.name,
      val: tc.userId
    }
  });
  teachers.unshift({text: '其他', val: 'other'})
  return uniqBy(teachers, 'val')
};

/**
 * 加载小班班主任数据(学管师)
 * */
const loadSmallMainTc = async (params) => {
  const userData = Index.getLoginUser();
  let fetchParams = {
    roleCode: userData.roleCode,
    organizationId: userData.organizationId,
    monitoringUserId: userData.userId,
    monitoringUserName: userData.name,
  };
  const rsp = await getUserByRoldCodesSelection(fetchParams, true);
  let dictKey = Object.keys(rsp.value);
  let dict = [];
  dictKey.forEach((item) => {
    dict.push({
      text: rsp.value[item],
      val: item,
    });
  });
  return dict;
};

export {
  formateDict,
  formatGroupDict,
  loadCommonDict,
  loadBranchDict,
  loadCampusDict,
  loadAllBranchDict,
  loadProvinceCityDict,
  getCityDictByProvince,
  mapDataToDict,
  loadBranchCampusDict,
  dictAddOptionTitle,
  loadAllBranchCampusDict,
  loadSmallClassTcDict,
  loadSmallMainTc,
}
