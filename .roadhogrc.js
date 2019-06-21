module.exports = {
    entry: "src/index.js",
    disableCSSModules: false,
    publicPath: "/",
    autoprefixer: null,
    disableCSSSourceMap: true,
    hash: true,
    proxy: {
        "/eduboss": {
            target: "https://xhboss-test.xiaojiaoyu100.com",
            changeOrigin: true
        }
    },
    // babel-plugin-import 按需加载
    extraBabelPlugins: [
        "transform-runtime",
        "transform-decorators-legacy",
        ["import", {libraryName: "antd-mobile", style: "css"}]
    ],
    cssModulesExclude: [],
    env: {
        "development": {
            "extraBabelPlugins": [
                "dva-hmr"
            ]
        }
    },
    define: {
        "process.env": {
            "NODE_ENV": JSON.stringify(process.env.NODE_ENV),
            "PROXY_OLD_BOSS": false,
            "PROXY_OLD_BOSS_URL": "'/webapp/'"
        }
    }
};
