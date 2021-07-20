const ora = require('ora');

const wrapLoading = async (fn, message, ...args) => {
  // 使用 ora 初始化，传入提示信息 message
  const spinner = ora(message);
  spinner.color = 'yellow';
  // 开始加载动画
  spinner.start();

  try {
    // 执行传入方法 fn
    const result = await fn(...args);
    // 状态为修改为成功
    spinner.succeed();
    return result; 
  } catch (error) {
    // 状态为修改为失败
    spinner.fail('Request failed...');
    return;
  } 
}

module.exports = { wrapLoading };
