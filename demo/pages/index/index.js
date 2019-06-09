//index.js
//获取应用实例
const app = getApp()
const { connect } = app.Store

const IndexPage = {
    data: {}
}

const ConnectPage = connect(state => {
    return {
        hasLogin: state.hasLogin,
        userName: state.userName
    }
})(IndexPage)

Page(ConnectPage)
