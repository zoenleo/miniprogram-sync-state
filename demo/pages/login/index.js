let app = getApp()
const { connect } = app.Store

const LoginPage = {
    onLoad() {
        console.warn('page load')
    },
    onShow() {},
    onUnload() {
        console.warn('page unload')
    },
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
    state => {
        return {}
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
