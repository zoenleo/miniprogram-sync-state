# miniprogram-sync-state

零侵入，移植和移除都极其方便的一款原生小程序同步状态库。
类react-redux api风格。

## 安装

#### npm构建

> npm使用此库需要依赖小程序基础库 2.2.1 以上版本，同时依赖开发者工具的 npm 构建。具体详情可查阅[官方 npm 文档](https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html)。

```bash
npm install --save miniprogram-sync-state
```

小程序开发者工具 -> 详情 -> 使用npm模块

小程序开发者工具 -> 工具 -> 构建npm

```
const { createStore } = require('miniprogram-sync-state')
```

#### 直接引入

复制node_modules/miniprogram-sync-state项目(或自行clone github项目npm run build生成)下的小程序生成文件miniprogram_dist/index.js置于项目文件夹内引用
```
const { createStore } = require('../../libs/miniprogram-sync-state/index.js')
```

## 使用

#### API


```
const { createStore, connect, connectComponent, setState } = require('miniprogram-sync-state')

/**
* connect
* @param {Function} mapStateToData
* @param {Function} mapMethodToPage
* @return {Function}
*/

/**
 * connectComponent
 * @param {Function} mapStateToData
 * @param {Function} mapMethodToPage
 * @return {Function}
 */

 /**
 * createStore
 * @param {Object} state
 * @return {Object}
 */

 /**
 * setState
 * @param {Object | Function} state
 */

```

#### 示例

```js
// app.js

const initStore = {
    hasLogin: false,    
    userName: ''
}
const { createStore } = require('miniprogram-sync-state')
const Store = createStore(initStore)

App({
    onLaunch() {},
    Store
})


```

```js
// pages/login/index.js

let app = getApp()
const { connect } = app.Store

const LoginPage = {
    onReady(e) {},
    onShow() {},
    bindUserNameChange(e) {
        this.setData({
            username: e.detail.value
        })
    },
    bindLogin() {
        if (!this.data.username) return
        this.login(this.data.username)
        wx.navigateBack({
            delta: 1
        })
    }
}
const ConnectPage = connect(
    ({hasLogin, userName}) => {
        return {
            hasLogin,
            userName
        }
    },
    (setState, state) => ({
        login(userName) {
            setState({
                hasLogin: true,
                userName
            })
        }
    })
)(LoginPage)

Page(ConnectPage)

```

更具体使用可查看[demo](https://github.com/zoenleo/miniprogram-sync-state/tree/master/demo)

#### 注意

禁止在任何能获取到`state实例`的地方直接修改`state`，以免造成未知错误（这一点同`react`），虽然可以在状态库中做深拷贝避免此隐患，但是需要考虑性能问题以及是否必要，最终决定采用规范的方式做限制。

```js
// 🚫 以下为禁止示例

const ConnectPage = connect(
    state => {
        state.userInfo.userName = 'err use'
        return {
            userInfo: state.userInfo
        }
    }
)(Page)

```

## 更新

+ 1.1.0
    新增组件连接器（connectConponent）
    代码优化