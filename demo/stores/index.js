import _stores from './stores'
const { createStore } = require('miniprogram-sync-state')
const store = createStore(_stores)

module.exports = store
