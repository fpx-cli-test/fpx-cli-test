const inquirer = require('inquirer');
const { getRepoList, getTagList } = require('./http');
const { wrapLoading } = require('./wrapLoading');


const downloadModule = async () => {
  // 下载模版 配置相关信息
  // 获取用户选择的模版
  const getRepo = async () => {
    // 1) 从远程拉取模版数据
    const repoList = await wrapLoading(getRepoList, 'waiting fetch template');
    if (!repoList) return;

    // 过滤我们需要的模版名称
    const repos = repoList?.map(item => item.name);

    // 2) 用户选择自己新下载的模版名称
    const { repo } = await inquirer.prompt({
      name: 'repo',
      type: 'list',
      choices: repos,
      message: 'Please choose a template to create project',
    });

    // 3) return 用户的选择
    return repo;
  };

  // 获取用户选择的版本
  // 1) 基于 repo ，远程拉取对应的tag列表
  // 2) 用户选择自己需要下载的 tag
  // 3) return 用户选择的tag
  const getTag = async (repo) => {
    // 1) 基于 repo ，远程拉取对应的tag列表
    const tags = await wrapLoading(getTagList, 'waiting fetch tag', repo);
    /**
     * 直接加个try...catch 没有tag报错有点奇怪
     */
    if (!tags) return;

    // 过滤我们需要的 tag 名称
    const tagsList = tags.map(item => item.name);

    // 2) 用户选择自己需要下载的 tag
    const { tag } = await inquirer.prompt({
      name: 'tag',
      type: 'list',
      choices: tagsList,
      message: 'Please choose a tag to create project'
    });
    
    // 3) return 用户选择的tag
    return tag;
  };

  const repo = await getRepo();
  const tag = await getTag(repo);
  // 1) 拼接下载地址
  const requestUrl = `liaosirui333/${repo}${tag?'#'+tag:''}`;
  return requestUrl;
};

module.exports = { downloadModule }