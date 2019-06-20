/**
 * 主页
 */
import React from 'react'
import {connect} from 'dva'
// import { browserHistory } from 'dva/router'
import moment from 'moment';
import cubec from 'cubec';

const getNow = function(){
  return parseInt(moment(Date.now()).valueOf()/1000);
};

const stayedTimeModel = cubec.model({
  name: "stayedTimeModel",
  store: true,

  data: {
    name: "首页",
    path: "/Dashboard",
    timeStamp: getNow()
  },

  events: {
    init(){
      const now = getNow();

      this.set({
        name: "首页",
        path: "/xxs",
        timeStamp: now
      });
    }
  }
});

class Main extends React.Component {
  componentWillMount() {
    const { dispatch, history, location , account } = this.props;

    dispatch({
      type: 'main/init'
    });

    history.push('/xxs');

    if (!global.loadURL) {
      global.loadURL = this.openTabByUrl
    }
    if (!global.closeActivedTab) {
      global.closeActivedTab = this.closeActivedTab
    }
    if (!global.Index) {
      global.Index = {}
    }
    global.Index = {
      ...global.Index,
      closeCurrentTab: this.closeActivedTab,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.account.isLogin && nextProps.account.isLogin) {
    }
  }

  render() {
    const {account: {isLogin}} = this.props;

    return (
      <div className="Main-root">
        <span>main</span>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state);

  return {
    account: state.account,
  }
};

export default connect(mapStateToProps)(Main)
