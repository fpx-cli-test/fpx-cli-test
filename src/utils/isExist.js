const path = require('path');
const fs = require('fs-extra'); // fs的一个扩展，提供了更加便利的api，支持 promise 语法
const inquirer = require('inquirer');
const { wrapLoading } = require('./wrapLoading');

const isExist = async (projectName, options=null) => {
  // 当前命令行选择的目录
  const cwd = process.cwd();
  // 需要创建的目录地址
  const targetDir = path.join(cwd, projectName);

  // 判断目录是否存在
  if (fs.existsSync(targetDir)) {
    
    // 是否为强制创建
    if (options?.force) {
      await fs.remove(targetDir)
    } else {
      // 询问用户是否覆盖
      let { action } = await inquirer.prompt([
        {
          name: 'action',
          type: 'list',
          message: 'Target directory already exists Pick an action:',
          choices: [
            {
              name: 'Overwrite',
              value: 'overwrite',
            },
            {
              name: 'Cancel',
              value: false,
            }
          ]
        }
      ])

      if (!action) {
        return false;
      } else if (action === 'overwrite') {
        // 移除已存在的目录
        await wrapLoading(fs.remove, 'Remove Folder', targetDir);
        return true;
      }
    }
  }

  return true;
}

module.exports = {
  isExist,
};