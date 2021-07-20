
/**
 * 获取远程文件
 */

// 通过 axios 处理请求
const axios = require('axios');
axios.defaults.headers.get['Content-Type'] = 'application/vnd.github.v3+json';
axios.interceptors.response.use(res => {
  return res.data;
})

/**
 * 获取模版列表
 * @return Promise
 */
async function getRepoList() {
  return axios.get('https://api.github.com/orgs/fpx-cli-test/repos');
}

/**
 * 获取版本信息
 * @param {string} repo 模版名称
 * @returns Promise
 */
async function getTagList(repo) {
  return axios.get(`https://api.github.com/orgs/fpx-cli-test/${repo}/tags`);
}

module.exports = {
  getRepoList,
  getTagList
}
