const addNavs = (routes) => {
    const newRoutes = routes.map(route => {
        const {path} = route
        const arry = path.split('/')
        if (arry.length > 1) {
            const navInfos = arry.slice(0, arry.length - 1)
            const navs = navInfos.map((nav, i) => {
                const p = navInfos.slice(0, i + 1).join('/')
                const name = routes.find(r => r.path === p).name
                return {path: '/' + p, name}
            })
            return {...route, navs}
        } else {
            return route
        }
    })
    return newRoutes
}

export default {
    addNavs,
}

