import { addNavs } from '../util'

const routes = [
    {
        path: '/',
        name: 'main',
        getComponent(nextState, cb) {
            require.ensure([], require => {
                cb(null, require('PAGE/main'));
            });
        }
    }
];

export default addNavs(routes);
