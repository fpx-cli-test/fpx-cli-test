#!/usr/bin/env node

// #!用于指定脚本的解释程序
'use strict';
// console.log('hihihi normal');

import commander from 'commander';
import create from './create';
import inquirer from 'inquirer';

const program = new commander.Command();

program
  // 添加命令名称 (跟<>代表名称必填、 []选填)，该参数会被传入至action的回调以及program.args数组中
  .command('create <app-name>')
  // 描述
  .description('create a new project')
  // 是否强制创建（加入该选项则已存在目录直接覆盖）
  .option('-f --force', 'overwrite target directory if it exist')
  .action((name, options) => {
    create(name, options)
    // inquirer.prompt(question).then(answer => {
    //   console.log(answer);
    // })
  })

program
  // 版本号
  .version(`v${require('../package.json').version}`)
  // 用法
  .usage('<command> [option]')
  // alias 别名

// 解析用户执行目录传入的参数
program.parse(process.argv)