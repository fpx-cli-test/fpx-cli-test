const download = require('download-git-repo');
const { promisify } = require('util');
const { DOWNLOAD_FILE } = require('./const');
const { wrapLoading } = require('./wrapLoading');
const { isExist } = require('./isExist');

// const 

// 获取用户选择的模版
const downloadFile = async (projectName) => {
  const go = await isExist(projectName);
  go && await wrapLoading(promisify(download), 'downloading file...', DOWNLOAD_FILE, projectName);
};

module.exports = { downloadFile };