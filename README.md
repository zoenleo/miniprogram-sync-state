# miniprogram-sync-state

原生小程序同步状态库。

> 使用此组件需要依赖小程序基础库 2.2.1 以上版本，同时依赖开发者工具的 npm 构建。具体详情可查阅[官方 npm 文档](https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html)。

## 安装

#### npm构建

```bash
npm install --save miniprogram-sync-state
```

小程序开发者工具 -> 详情 -> 使用npm模块

小程序开发者工具 -> 工具 -> 构建npm

```
const { createStore } = require('miniprogram-sync-state')
```

#### 直接引入

copy src文件夹下的index.js置于项目文件夹内引用

## 使用

具体使用可查看demo