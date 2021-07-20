
const download = require('download-git-repo');


// 获取用户选择的模版
const downloadGit = async (requestUrl, projectName) => {
  return new Promise((resolve, reject) => {
    download(
      requestUrl, // 参数1： 下载地址
      projectName, // 参数2：创建位置
      {},
      (err) => {
        err ? reject(err) : resolve();
      }
    );
  })
};

module.exports = { downloadGit }