const addNavs = (routes) => {
    let newRoutes = routes.map(route => {
        const {path} = route;
        const array = path.split('/');
        if (array.length > 1) {
            const navInfos = array.slice(0, array.length - 1);
            const navs = navInfos.map((nav, i) => {
                const p = navInfos.slice(0, i + 1).join('/');
                const name = routes.find(r => r.path === p).name;
                return {path: '/' + p, name}
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

