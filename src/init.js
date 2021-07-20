
const create = require('./utils/create');
const { isExist } = require('./utils/isExist');

const init = async (projectName, options) => {
  // 执行创建命令

  // 先判断文件是否存在，并执行命令
  const go = await isExist(projectName, options);

  // 创建项目
  go && create(projectName);
}

module.exports = init;