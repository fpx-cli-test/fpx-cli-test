
## 一、本地测试
### 1. 在`my-cli`目录下执行`npm link`。
该命令可以将my-cli下的bin命令软链接到全局，直接使用。

> 如遇执行命令失败：
> 
> - 先执行 `npm unlink fpx-cli`
> - 再执行 `npm link`
>
> - 或者在全局目录下删除`my-cli`文件夹

### 2. 执行以下命令
```
$ fpx-cli create 项目名
```
如果该目录下存在相同文件，则会出现选项，根据需求选择即可。
创建好项目之后，会自动安装依赖。。。。
其他需求待完善。。。

> 可完善需求
>> 模版完善
>>> sentry、钉钉登录、自动化部署、路由、自动打tag/快速回滚代码、基础的优化方案、打包分析、性能埋点

## 二、下载脚手架
```
$ npm install -g fpx-cli
$ fpx-cli create app-name
$ npm i
$ npm run start
```