/* config-overrides.js */
var styleLintPlugin = require('stylelint-webpack-plugin');
function addStyleLint(config, env) {
  config.plugins.push(new styleLintPlugin({
    configFile: 'stylelint.config.js',
    files: 'sass/**/*.s?(a|c)ss',
    syntax: 'scss'
  }));
}
const urlLoader = function (conf) {
  return conf.loader === 'url';
};
function rewireSass(config, env) {
  config.module.loaders.find(urlLoader).exclude.push(/\.scss$/);
  config.module.loaders.find(urlLoader).exclude.push(/\.svgicon$/);
  config.module.loaders.push({
    test: /\.scss$/,
    loader: 'style!css!sass'
  });
  return config;
}
module.exports = function override(config, env) {
  delete config.eslint.configFile;
  config.eslint.useEslintrc = true;
  rewireSass(config, env);
  addStyleLint(config, env);
  return config;
};
