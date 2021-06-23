const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const InlineChunkHtmlPlugin = require('inline-chunk-html-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

require('@babel/register')({ extensions: ['.ts'], cache: false });
const configs = require('./config');
/**
 * Webpack配置
 *
 * @see https://webpack.js.org/configuration/
 * @param {Record<string, boolean> | undefined} envName
 * @param {{ mode: "production" | "development" }} options
 * @returns {import("webpack").Configuration}
 */
module.exports = function config(env, options) {
  const isEnvProduction = options.mode === 'production';
  const isEnvDevelopment = options.mode === 'development';
  const isDevServer = isEnvDevelopment && process.argv.includes('serve');
  // 生成生产环境统计信息的文件
  const isEnvProductionProfile = isEnvProduction && process.argv.includes('--profile');
  const config = env.prod ? configs.prod : env.test ? configs.test : configs.local;

  process.env.BABEL_ENV = options.mode;
  process.env.BROWSERSLIST_ENV = options.mode;

  /**
   * 前端打包
   *
   * @see https://webpack.js.org/configuration/
   * @type {Configuration}
   */
  const appConfig = {
    name: 'app',
    mode: isEnvProduction ? 'production' : 'development',
    // 构建目标
    // `web` 类浏览器环境 `browserslist` 根据 browserslist 构建
    // https://github.com/webpack/webpack-dev-server/issues/2758
    target: isDevServer ? 'web' : 'browserslist',
    // 生产环境打包过程中，遇到第一个错误就直接退出打包
    bail: isEnvProduction,

    entry: path.join(__dirname, './src/index'),

    output: {
      path: path.resolve(__dirname, './build'),
      filename: isEnvProduction ? 'static/js/[name].[contenthash:8].js' : 'static/js/[name].js',
      chunkFilename: isEnvProduction ? 'static/js/[name].[contenthash:8].js' : 'static/js/[name].js',
      publicPath: '/',
      // 防止多个webpack运行时冲突
      uniqueName: 'app',
    },

    devtool: isEnvProduction ? 'source-map' : 'cheap-module-source-map',

    optimization: {
      minimize: isEnvProduction,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            parse: { ecma: 8 },
            compress: {
              ecma: 5,
              warnings: false,
              comparisons: false,
              inline: 2,
            },
            mangle: { safari10: true },
            keep_classnames: isEnvProductionProfile,
            keep_fnames: isEnvProductionProfile,
            output: { ecma: 5, comments: false, ascii_only: true },
          },
        }),
      ],
      // 抽取公用代码到单独的文件里
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
      // 重复打包hash不变
      runtimeChunk: {
        name: entrypoint => `runtime-${entrypoint.name}`,
      },
    },

    performance: {
      maxAssetSize: 650 * 1024,
      maxEntrypointSize: 650 * 1024,
    },

    resolve: {
      // 省略文件后缀
      extensions: ['.wasm', '.mjs', '.js', '.ts', '.d.ts', '.tsx', '.json'],
      // 别名
      alias: {
        '@': path.join(__dirname, './src'),
        ...(isEnvProductionProfile && {
          'react-dom$': 'react-dom/profiling',
          'scheduler/tracing': 'scheduler/tracing-profiling',
        }),
      },
    },

    module: {
      rules: [
        {
          oneOf: [
            {
              test: /\.(ico|jpg|jpeg|png|gif|svg|eot|otf|webp|ttf|woff|woff2)(\?.*)?$/,
              use: {
                loader: 'file-loader',
                options: {
                  name: '[path][name].[ext]',
                },
              },
            },
            {
              test: /\.(js|mjs|ts|tsx)$/,
              include: [path.resolve(__dirname, './src'), path.resolve(__dirname, './config')],
              loader: 'babel-loader',
              options: {
                rootMode: 'upward',
                plugins: [['@babel/plugin-transform-runtime'], isDevServer && 'react-refresh/babel'].filter(Boolean),
                cacheDirectory: '.cache/babel-loader',
                cacheCompression: false,
                compact: false, // isEnvProduction,
                sourceType: 'unambiguous',
              },
            },
          ],
        },
      ],
    },

    plugins: [
      isEnvProduction && new CleanWebpackPlugin(),
      // Generates an `index.html` file with the <script> injected.
      new HtmlWebpackPlugin({
        inject: true,
        template: path.resolve(__dirname, 'public/index.html'),
        ...(isEnvProduction && {
          minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
          },
        }),
      }),
      // 把runtimeChunk配置生成的runtime~xxx.js内联到index.html里
      isEnvProduction && new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime-.+[.]js/]),
      !isDevServer &&
        new CopyWebpackPlugin({
          patterns: [
            {
              from: './public',
              filter: filename => filename !== path.resolve(__dirname, 'public/index.html'),
            },
          ],
        }),
      new webpack.DefinePlugin({
        'process.env.APP_NAME': JSON.stringify('React App'),
        'process.env.APP_ORIGIN': JSON.stringify('http://localhost:3000'),
      }),
      isDevServer && new webpack.HotModuleReplacementPlugin(),
      isDevServer && new ReactRefreshWebpackPlugin(),
      options.analyze && new BundleAnalyzerPlugin(),
    ].filter(Boolean),
  };

  /**
   * 开发服务器
   *
   * @see https://webpack.js.org/configuration/dev-server/
   * @type {import("webpack-dev-server").Configuration}
   */
  const devServer = {
    contentBase: './public',
    compress: true, // gzip
    historyApiFallback: { disableDotRule: true },
    port: 3000,
    hot: true,
    proxy: [
      {
        context: [config.api.path, '/auth'],
        target: config.api.origin,
        changeOrigin: true,
        pathRewrite: config.api.prefix ? { '^/': `${config.api.prefix}/` } : {},
        onProxyReq(proxyReq, req) {
          const origin = `${req.protocol}://${req.hostname}:3000`;
          proxyReq.setHeader('origin', origin);
        },
      },
    ],
  };

  return isDevServer ? { ...appConfig, devServer } : appConfig;
};
