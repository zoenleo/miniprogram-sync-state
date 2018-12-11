//index.js
//获取应用实例
const app = getApp()
const { connect } = app.Store

const IndexPage = {
    data: {},
    onLoad: function() {},
    onShow() {},
    onShareAppMessage({ from, target }, webViewUrl) {
        return {
            title: '分享页面',
            path: this.route
        }
    }
}

const ConnectPage = connect(state => {
    return {
        hasLogin: state.hasLogin,
        userName: state.userName
    }
})(IndexPage)

Page(ConnectPage)
