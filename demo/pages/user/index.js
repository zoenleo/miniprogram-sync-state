const app = getApp()

const { connect, setState } = app.Store

const UserPages = {
    onLoad() {},
    onShow() {},
    onUnload() {},
    bindLogin() {
        wx.navigateTo({
            url: '../login/index'
        })
    }
}

const ConnectPage = connect(state => ({
    hasLogin: state.hasLogin,
    userName: state.userName
}))(UserPages)

Page(ConnectPage)
