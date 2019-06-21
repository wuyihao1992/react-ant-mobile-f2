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
    }
];

export default addNavs(routes);
