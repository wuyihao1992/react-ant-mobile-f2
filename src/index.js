import app from './app'
import moment from 'moment'
import 'moment/locale/zh-cn'
import './index.html'
import './GlobalEmitter'
import 'UTIL/GlobalEvent/index.js';

moment.locale('zh-cn');

// 1. Initialize
// 移至SRC/app模块

// 2. Plugins
// app.use(createLoading())

// 3. Model
app.model(require('MODEL/account'));
// app.model(require('MODEL/dict'));

// 4. Router
app.router(require('./routes/index'));

// 5. Start
app.start('#root');
