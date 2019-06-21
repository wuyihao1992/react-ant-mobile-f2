const addNavs = (routes) => {
    let newRoutes = routes.map(route => {
        const {path} = route;
        let tempArr = path.split('/');
        let array = tempArr.filter(value => {
            return value !== '';
        });

        if (array.length > 1) {
            const navInfos = array.slice(0, array.length - 1);
            const navs = navInfos.map((nav, i) => {
                let p = navInfos.slice(0, i + 1).join('/');
                let item = routes.find(r => r.path === p) || {};
                let name = item.name || '';
                return {path: '/' + p, name};
            });
            return {...route, navs}
        } else {
            return route
        }
    });

    return newRoutes || [];
};

export default {
    addNavs
}

