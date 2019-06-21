import { addNavs } from '../util'

const routes = [
    {
        path: '/FlexDemo',
        name: 'FlexDemo',
        getComponent(nextState, cb) {
            require.ensure([], (require) => {
                cb(null, require('PAGE/demo/FlexDemo'));
            });
        }
    },
    {
        path: '/ChartDemo',
        name: 'ChartDemo',
        getComponent(nextState, cb) {
            require.ensure([], (require) => {
                cb(null, require('PAGE/demo/ChartDemo'));
            });
        }
    }
];

export default addNavs(routes);
