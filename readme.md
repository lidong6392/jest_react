[![CircleCI branch](https://img.shields.io/circleci/project/github/duxianwei520/react/master.svg?style=flat-square)](https://circleci.com/gh/duxianwei520/react)
[![GitHub forks](https://img.shields.io/github/forks/duxianwei520/react.svg)](https://github.com/duxianwei520/react/network)
[![GitHub stars](https://img.shields.io/github/stars/duxianwei520/react.svg)](https://github.com/duxianwei520/react/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/duxianwei520/react.svg)](https://github.com/duxianwei520/react/issues)
[![GitHub license](https://img.shields.io/github/license/duxianwei520/react.svg)](https://github.com/duxianwei520/react/blob/master/LICENSE)
[![Coverage Status](https://coveralls.io/repos/github/duxianwei520/react/badge.svg)](https://coveralls.io/github/duxianwei520/react)

## 项目技术栈

node10.15.3 + react@16.12.0 + redux@3.7.2 + react-router@3.2.0 + webpack@4.41.2 + axios@0.19.0 + less@2.7.1 + antd@3.25.2


## 项目运行


```
git clone git@github.com:lidong6392/jest_react.git 

cd react (进入项目)

npm install (安装依赖包)

npm start (启动服务)

```


最后的构建命令
```
npm run build (正式环境的打包部署)
npm run testing (测试环境的打包部署命令，可以根据具体需求自行配置修改)

```

服务端返回的数据格式也是标准的json，如下所示

```
{
  data: {
    totalCount: 100,
    currentPage: 1,
    pageSize: 10,
    'list': [
    ],
  },
  msg: '',
  status: 1,
}

```
所有异步请求返回都会经过configs里面的ajax.js做处理，如果请求没有任何问题，那status返回值是1；
如果请求错误，比如说参数错误或者其他报错之类的，那status返回值就是0；
如果status值是-1，表示登录超时，那么就会跳出登录。
这些参数都可以根据实际情况进行调整，报错或者成功的提示信息放在msg里面返回。
当前项目集成了完整的用户管理、角色管理、模块管理等基本的权限管理功能，小伙伴们一定要同时启动npm run mock才可以看到噢


## 功能一览
- [√] 登录，以及登录权限控制
- [√] 项目公用npm模块dll化
- [√] redux完整示范
- [√] mockjs模拟后端返回接口
- [√] axios异步请求跨域的设置
- [√] 实时的webpack包大小预览,方便优化
- [√] draftjs编辑器




