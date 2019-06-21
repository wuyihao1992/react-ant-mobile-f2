const ExtractTextPlugin = require('extract-text-webpack-plugin');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var path = require('path');
const webpack = require('webpack');

var rootPath = path.resolve(__dirname); // 项目根目录
var src = path.join(rootPath, 'src');   // 开发源码目录

// src下的目录
var resolveSrc = function (dir) {
  return path.join(__dirname, 'src/', dir);
};

let envToBeInjected = {
  BUILD_ENV: JSON.stringify(process.env.BUILD_ENV)
};

// 自定义路径别名
let alias = {
  SRC: src,
  ASSET: resolveSrc('assets'),
  COMPONENT: resolveSrc('components'),
  MODEL: resolveSrc('models'),
  PAGE: resolveSrc('pages'),
  SERVICE: resolveSrc('services'),
  UTIL: resolveSrc('common/utils'),
  CONST: resolveSrc('constants'),
};

module.exports = function(webpackConfig, env) {
  // 对roadhog默认配置进行操作
  if (env === 'production' && !/\.dll\.js$/.test(webpackConfig.output.filename)) {
    webpackConfig.module.rules.forEach((rule) => {
      if (String(rule.test) === '/\\.less$/' || String(rule.test) === '/\\.css$/'){
        rule.use = ExtractTextPlugin.extract({
          fallback: 'style',
          use: rule.use.slice(1)
        });
      }
    });

    webpackConfig.plugins.push(new webpack.HashedModuleIdsPlugin());
    webpackConfig.plugins.push(new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: ({ resource }) => (
        resource &&
        resource.indexOf('node_modules') >= 0 &&
        resource.match(/\.js$/)
      )
    }));

    webpackConfig.plugins.push(new webpack.optimize.CommonsChunkPlugin({
      async:'echarts',
      minChunks(module) {
        var resource = module.resource;
        return resource && (resource.indexOf('echarts') >= 0 || resource.indexOf('zrender') >= 0);
      }
    }));

    webpackConfig.plugins.push(new webpack.optimize.CommonsChunkPlugin({
      children: true,
      // (选择所有被选 chunks 的子 chunks)
      async: true,
      // (创建一个异步 公共chunk)
      minChunks: 2,
    }));

    webpackConfig.plugins.push(new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    }));

    webpackConfig.plugins.push(new InlineManifestWebpackPlugin({name: 'webpackManifest'}));
    process.env.ANALYSE === 'true' && webpackConfig.plugins.push(new BundleAnalyzerPlugin({
      analyzerMode: 'static'
    }));
  }

  webpackConfig.plugins.forEach((val, index) => {
    if (val.constructor.name === 'DefinePlugin') {
      webpackConfig.plugins[index] = new webpack.DefinePlugin({
        ...val.definitions,
        'process.env': {
          ...JSON.parse(val.definitions['process.env']),
          ...envToBeInjected
        }
      })
    } else if (val.constructor.name === 'LoaderOptionsPlugin') {
      webpackConfig.plugins[index] = new webpack.LoaderOptionsPlugin({
        ...val.options,
        minimize: true,
        debug: false,
      })
    } else if (val.constructor.name === 'ExtractTextPlugin') {
      webpackConfig.plugins[index] = new ExtractTextPlugin({
        filename: val.filename
      })
    }
  })

  webpackConfig.resolve.alias = Object.assign(webpackConfig.resolve.alias || {}, alias)

  return webpackConfig
};
