//index.js
//获取应用实例
const app = getApp()
const { connectComponent } = app.Store

const userInfo = {
    data: {},
    lifetimes: {
        attached() {
            console.warn('component attached')
        }
    },
    detached() {
        console.warn('component detached')
    }
}

const ConnectedComponent = connectComponent(state => {
    return {
        hasLogin: state.hasLogin,
        userName: state.userName
    }
})(userInfo)

Component(ConnectedComponent)
