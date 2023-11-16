/* eslint-disable @typescript-eslint/no-var-requires */
const {override: configOverrides} = require('customize-cra');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');
const ImageMinimizerPlugin = require('image-webpack-loader');

const isEnvProductionProfile = process.env.NODE_ENV === 'production' && process.env.PROFILE === 'true';

module.exports = configOverrides(
  (config, env) => {
    if (env === 'production') {
      config.optimization.minimizer = [
        new TerserPlugin({
          terserOptions: {
            parse: {
              ecma: 8,
            },
            compress: {
              ecma: 5,
              warnings: false,
              comparisons: false,
              inline: 2,
              drop_console: true,
            },
            mangle: {
              safari10: true,
            },
            keep_classnames: isEnvProductionProfile,
            keep_fnames: isEnvProductionProfile,
            output: {
              ecma: 5,
              comments: false,
              ascii_only: true,
            },
          },
        }),
      ];
      config.plugins.push(
        new CompressionWebpackPlugin({
          algorithm: 'gzip',
          test: /\.(js|css|html|svg)$/,
          threshold: 10240,
          minRatio: 0.8,
        }),
      );
      config.plugins.push(
        new BrotliPlugin({
          test: /\.(js|css|html|svg)$/,
          threshold: 10240,
          minRatio: 0.8,
        }),
      );
      config.devtool = isEnvProductionProfile ? 'source-map' : false;
    }

    return config;
  },
  addWebpackModuleRule({
    test: /\.(png|jpe?g|gif)$/i,
    use: [
      {
        loader: 'file-loader',
      },
      {
        loader: 'image-webpack-loader',
        options: {
          mozjpeg: {
            progressive: true,
            quality: 65,
          },
          optipng: {
            enabled: true,
          },
          pngquant: {
            quality: [0.65, 0.9],
            speed: 4,
          },
          gifsicle: {
            interlaced: false,
          },
          webp: {
            quality: 75,
          },
        },
      },
    ],
  }),
);
