import dva from 'dva'
import { browserHistory } from 'dva/router'

const opts = {
  history: browserHistory,
};

const app = dva(opts);

export default app
