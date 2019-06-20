import { addNavs } from '../util'

const routes = [
    {
        path: '*',
        name: '404',
        getComponent(nextState, cb) {
            require.ensure([], (require) => {
                cb(null, require('PAGE/common/404'));
            });
        }
    }
];

export default addNavs(routes);
