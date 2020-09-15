"use strict";
const path = require("path");
const config = require("../config");
// webpack4不支持extrack-text-webpack-plugin 用在css上
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const packageConfig = require("../package.json");
const glob = require('glob')
// exports.getEntryList = function(path) {
//   var files = glob.sync(path);
//   var map = {};
//   files.forEach(item => {
//     console.log(item);
//     var name = item.split('/')[3]; //作为入口的名字
//     map[name] = item;
//   });
//   return map
// }

exports.getEntryList = function () {
  var files = glob.sync('./src/pages/**/*.html');
  var map = {html:{},js:{}};
  files.forEach(function (entry, i) {
      var baseName = path.basename(entry) //返回 文件名.html
      var extname = path.extname(entry);  //返回 .html
      var fileName = baseName.replace(extname, '');
      map['js'][fileName] = entry.replace(baseName,'main.js');
      map['html'][fileName] = entry;
  })
  return map;
}

exports.assetsPath = function(_path) {
  const assetsSubDirectory = process.env.NODE_ENV === "production" ? config.build.assetsSubDirectory : config.dev.assetsSubDirectory;
  return path.posix.join(assetsSubDirectory, _path);
};
exports.cssLoaders = function(options) {
  options = options || {};
  const cssLoader = {
    loader: "css-loader",
    options: {
      sourceMap: options.sourceMap,
    },
  };
  const postcssLoader = {
    loader: "postcss-loader",
    options: {
      sourceMap: options.sourceMap,
    },
  };
  // generate loader string to be used with extract text plugin
  function generateLoaders(loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader];
    if (loader) {
      loaders.push({
        loader: loader + "-loader",
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap,
        }),
      });
    }
    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      //webpack4已经不支持了
      // return ExtractTextPlugin.extract({
      //   use: loaders,
      //   fallback: 'vue-style-loader'
      // })
      return [MiniCssExtractPlugin.loader,'cache-loader'].concat(loaders);
    } else {
      return ["vue-style-loader"].concat(loaders);
    }
  }
  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders("less"),
    sass: generateLoaders("sass", { indentedSyntax: true }),
    scss: generateLoaders("sass"),
    stylus: generateLoaders("stylus"),
    styl: generateLoaders("stylus"),
  };
};
// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function(options) {
  const output = [];
  const loaders = exports.cssLoaders(options);
  for (const extension in loaders) {
    const loader = loaders[extension];
    output.push({
      test: new RegExp("\\." + extension + "$"),
      use: loader,
    });
  }
  return output;
};
exports.createNotifierCallback = () => {
  const notifier = require("node-notifier");
  return (severity, errors) => {
    if (severity !== "error") return;
    const error = errors[0];
    const filename = error.file && error.file.split("!").pop();
    notifier.notify({
      title: packageConfig.name,
      message: severity + ": " + error.name,
      subtitle: filename || "",
      icon: path.join(__dirname, "logo.png"),
    });
  };
};
// exports.getEntryList = () => {
//   glob.sync('src/pages/**/main.js')
// };