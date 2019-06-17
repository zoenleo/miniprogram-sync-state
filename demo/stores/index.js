const { createStore } = require('../libs/miniprogram-sync-state/index')
import initState from './state.js'

const store = createStore(initState)
module.exports = store
