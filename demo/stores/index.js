import initState from './state.js'
const { createStore } = require('./store.js')
const store = createStore(initState)

module.exports = store
