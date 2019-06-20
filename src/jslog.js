import cubec, { struct, verify } from "cubec";

const jslog = {};
const _isStr = struct.type("string");

// 上报模型
const reportModel = cubec.model({
  name: "reportModel",

  // 上报的数据格式
  data: {
    topic: "JSLOG",
    event: ""
  },

  // 设置模型校验
  verify: {
    event: verify.isString
  },

  // 配置模型发射事件
  events: {
    change(){
      // 模型数据发生改变时，自动上报后台接口
      this.sync("/eduboss/aliyunLog/send.do");
    },

    'catch:verify': function(data){
      console.warn("上报打点数据格式校验错误 -> 本次上报数据:", data);
    }
  }
});

// 注册一个全局的代理视图
// 监听到全局特定DOM的点击事件， 进行上报
// 不会在同一容器层级下执行重复绑定
if(!document.documentElement.getAttribute("jslog_mount")) {
  document.documentElement.setAttribute("jslog_mount", 1);
  const watcherView = cubec.view({
    root: document.documentElement,

    render: struct.noop(),
    events: {
      // 为全局注册点击事件
      'click:[data-report-click]': function (e) {
        const target = e.currentTarget;

        let name = target.getAttribute("data-report-click");
        let params = target.getAttribute("data-report-params") || {};

        if (name) {

          try {

            params = _isStr(params) ? JSON.parse(params) : params;
            reportModel.set({
              topic: "JSLOG",
              function_name: name,
              event: "click",
              _selfTimeStamp: Date.now(),
              ...params
            });

          } catch (e) {

            console.warn("上报打点数据额外参数转化发生错误 -> 本次上报额外参数:", params);

          }

        }
      }

    }
  });
}

jslog.report = function(eventName, params={}){

  reportModel.set({
    topic: "JSLOG",
    event: eventName.toLowerCase(),
    _selfTimeStamp: Date.now(),
    ...params
  });

};

export default jslog;
