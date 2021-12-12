const path = require('path');
const resolve = (dir) => path.join(__dirname, dir);

module.exports = {
  // 構建後的文件是否啟用哈希命名
  filenameHashing: true,
  // 是否在save文件時lint代碼, 需要先安裝cli-plugin-eslint
  // lintOnSave: process.env.NODE_ENV !== 'production',
  productionSourceMap: process.env.NODE_ENV !== 'production',
  chainWebpack: (config) => {
    config.resolve.alias.set('@', resolve('src'));
    // .set("admin", resolve("src/pages/admin"))
    // .set("web", resolve("src/pages/web"));
  }
};
