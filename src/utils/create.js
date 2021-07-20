
/**
 * 处理项目获取远程模版逻辑
 */
const ora = require('ora');
const inquirer = require('inquirer');
const chalk = require('chalk');
const { promisify } = require('util');
const path = require('path');
const { install } = require('./install');
const { downloadProgram } = require('./dowmloadProgram');
const { downloadGit } = require('./downloadGitRepo');
const fs = require('fs-extra');


const exist = promisify(fs.stat)

const create = (projectName) => {
  // 接收用户命令
  inquirer
    .prompt([
      {
        name: 'description',
        message: 'Please enter the project description',
      },
      {
        name: 'author',
        message: 'Please enter the project author',
      },
      // {
      //   type: 'list',
      //   name: 'language',
      //   message: 'select the develop language',
      //   choices: ['javaScript', 'typeScript'],
      // },
      {
        type: 'list',
        name: 'package',
        message: 'select the package management',
        choices: ['npm', 'yarn'],
      },
    ]).then(async answer => {
      // 下载模版 配置相关信息
      const requestUrl = await downloadProgram();
      let loading = ora('downloading template...');
      loading.start();
      loading.color = 'yellow';
      downloadGit(requestUrl, projectName).then(async () =>{
        loading.succeed();
        const fileName = `${projectName}/package.json`;
        if (await exist(fileName)) {
          // 先读package.json
          const data = fs.readFileSync(fileName).toString();
          // 用户自定义
          let json = JSON.parse(data);
          json.name = projectName;
          json.author = answer.author;
          json.description = answer.description;
          // 写入
          fs.writeFileSync(
            fileName,
            JSON.stringify(json, null, '\t'),
            'utf-8',
          );
          // 提示
          console.log(chalk.green('Project initialization finished!'));
          console.log();
          console.log(chalk.yellowBright('start install dependencies...'));
          // 安装依赖
          await install({
            cwd: path.join(process.cwd(), projectName),
            package: answer.package,
          }).then(() => {
            console.log();
            console.log('We suggest that you begin by typing:');
            console.log();
            console.log(chalk.cyan('  cd'), projectName);
            console.log(`  ${chalk.cyan(`${answer.package} start`)}`);
          });
        }
      }, () => {
        loading.fail();
      })
    })
};

module.exports = create;

// class Create {
//   name: string;
//   targetDir: string;
//   downloadGitRepo: (arg1: string, arg2: string, arg3: string) => Promise<unknown>;
//   constructor (name, targetDir) {
//     // 目录名称
//     this.name = name;
//     // 创建位置
//     this.targetDir = targetDir;
//     // 对 download-git-repo 进行promise化改造
//     this.downloadGitRepo = util.promisify(downloadGitRepo);
//   }

//   // 接收用户命令
//   inquirer
//     .prompt([
//       {
//         name: 'description',
//         message: 'Please enter the project description',
//       },
//       {
//         name: 'author',
//         message: 'Please enter the project author',
//       },
//       {
//         type: 'list',
//         name: 'language',
//         message: 'select the develop language',
//         choices: ['javaScript', 'typeScript'],
//       },
//       {
//         type: 'list',
//         name: 'package',
//         message: 'select the package management',
//         choices: ['npm', 'yarn'],
//       },
//     ])


//   // 获取用户选择的模版
//   async getRepo() {
//     // 1) 从远程拉取模版数据
//     const repoList = await wrapLoading(getRepoList, 'waiting fetch template');
//     if (!repoList) return;

//     // 过滤我们需要的模版名称
//     const repos = repoList?.map(item => item.name);

//     // 2) 用户选择自己新下载的模版名称
//     const { repo } = await inquirer.prompt({
//       name: 'repo',
//       type: 'list',
//       choices: repos,
//       message: 'Please choose a template to create project',
//     });

//     // 3) return 用户的选择
//     return repo;
//   };


//   // 获取用户选择的版本
//   // 1) 基于 repo ，远程拉取对应的tag列表
//   // 2) 用户选择自己需要下载的 tag
//   // 3) return 用户选择的tag
//   async getTag(repo) {
//     // 1) 基于 repo ，远程拉取对应的tag列表
//     const tags = await wrapLoading(getTagList, 'waiting fetch tag', repo);
//     /**
//      * 直接加个try...catch 没有tag报错有点奇怪
//      */
//     if (!tags) return;

//     // 过滤我们需要的 tag 名称
//     const tagsList = tags.map(item => item.name);

//     // 2) 用户选择自己需要下载的 tag
//     const { tag } = await inquirer.prompt({
//       name: 'tag',
//       type: 'list',
//       choices: tagsList,
//       message: 'Please choose a tag to create project'
//     });
    
//     // 3) return 用户选择的tag
//     return tag;
//   };

//   // 下载远程模版
//   // 1) 拼接下载地址
//   // 2) 调用下载方法
//   async download(repo, tag=null) {

//     // 1) 拼接下载地址
//     const requestUrl = `liaosirui333/${repo}${tag?'#'+tag:''}`;

//     // 2) 调用下载方法
//     return await wrapLoading(
//       this.downloadGitRepo, // 远程下载方法
//       'waiting download template', // 加载提示信息
//       requestUrl, // 参数1： 下载地址
//       path.resolve(process.cwd(), this.targetDir) // 参数2：创建位置
//     );
//   };

//   // 核心创建逻辑
//   // 1) 获取模版名称
//   // 2) 获取 tag 名称
//   // 3) 下载模版到模版目录
//   // 4) 模版使用提示
//   async create () {
//     // 1) 获取模版名称
//     const repo = await this.getRepo(); // 仓库模版

//     // // 2) 获取 tag 名称
//     // const tag = await this.getTag(repo);

//     // 3) 下载模版到模版目录
//     const flag = await this.download(repo);

//     if (flag !== false) {
//       await install({
//         cwd: path.join(process.cwd(), this.name),
//         package: 'npm',
//       }).then(() => {
//         // 4）模板使用提示
//         console.log(`\r\nSuccessfully created project ${chalk.cyan(this.name)}`);
//         console.log(`\r\n  cd ${chalk.cyan(this.name)}`);
//         console.log('  npm run start\r\n');
//       })
//       // const command = 'npm';
//       // const args = [
//       //   'install',
//       //   '--no-audit', // https://github.com/facebook/create-react-app/issues/11174
//       //   '--save',
//       //   '--save-exact',
//       //   '--loglevel',
//       //   'error',
//       // ];
//       // const proc = spawn.sync(command, args, { stdio: 'inherit' });
//       // if (proc.status !== 0) {
//       //   console.error(`\`${command} ${args.join(' ')}\` failed`);
//       //   return;
//       // }
//       // else{
//       //   // 4）模板使用提示
//       //   console.log(`\r\nSuccessfully created project ${chalk.cyan(this.name)}`);
//       //   console.log(`\r\n  cd ${chalk.cyan(this.name)}`);
//       //   console.log('  npm run start\r\n');
//       //   return;
//       // }
//       // child.on('close', code => {
//       //   if (code !== 0) {
//       //     reject({
//       //       command: `${command} ${args.join(' ')}`,
//       //     });
//       //     return;
//       //   }
//       //   // 4）模板使用提示
//       //   console.log(`\r\nSuccessfully created project ${chalk.cyan(this.name)}`);
//       //   console.log(`\r\n  cd ${chalk.cyan(this.name)}`);
//       //   console.log('  npm run start\r\n');
//       //   resolve();
//       // });
      
      
//     }
//   }
// }

// export default Create;