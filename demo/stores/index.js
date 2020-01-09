const { createStore } = require('miniprogram-sync-state')
import initState from './state.js'

const store = createStore(initState)
module.exports = store
