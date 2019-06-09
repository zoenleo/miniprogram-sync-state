const app = getApp()

const { connect, setState } = app.Store

const UserPages = {
    onLoad() {
        console.warn('page load')
    },
    onShow() {},
    onUnload() {
        console.warn('page unload')
    },
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
