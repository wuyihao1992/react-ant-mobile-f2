module.exports = {
  "entry": "src/index.js",
  "disableCSSModules": false,
  "publicPath": "/",
  // "theme": "src/components/theme/override_antd.js",
  "autoprefixer": null,
  "disableCSSSourceMap": true,
  "hash": true,
  "proxy": {
    // "/eduboss": {
    //   "target": "http://localhost:8082",
    //   "changeOrigin": true
    // },
    "/eduboss": {
      "target": "https://xhboss-test.xiaojiaoyu100.com",
      "changeOrigin": true
    },
    "/webapp": {
      "target": "http://localhost:8686",
      "changeOrigin": true
    }
  },
  "extraBabelPlugins": [
    "transform-runtime",
    ["import", { "libraryName": "antd", "style": true }]
  ],
  "cssModulesExclude": [],
  "env": {
    "development": {
      "extraBabelPlugins": [
        "dva-hmr"
      ]
    }
  },
  "define": {
    "process.env": {
      "NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      "PROXY_OLD_BOSS": false,
      "PROXY_OLD_BOSS_URL": "'/webapp/'"
    }
  }
};
