import { isFunction, isObject, warn, err } from './utils'

/**
 * 浅比较当前date和新的stateMap，并返回更小粒度的更新
 * @param {String} data
 * @param {String} stateMap
 * @return {Object | false}
 */

function shallowDiffData(data, stateMap) {
    if (!isObject(stateMap)) return false
    let newMap = {}
    let hasDiff = false
    for (let key in stateMap) {
        if (stateMap[key] !== data[key]) {
            hasDiff = true
            newMap[key] = stateMap[key]
        }
    }
    return hasDiff && newMap
}

/**
 * 状态存储
 */
let _state = null

/**
 * 页面实例
 */
let _subjects = []

/**
 * 观察者
 */
let _observers = []

/**
 * 连接器
 * @param {Function} mapStateToData
 * @param {Function} mapMethodToPage
 * @return {Function}
 */
function connect(mapStateToData, mapMethodToPage) {
    if (mapStateToData !== undefined && !isFunction(mapStateToData)) {
        err(
            `connect first param accept a function, but got a ${typeof mapStateToData}`
        )
    }
    if (mapMethodToPage !== undefined && !isFunction(mapMethodToPage)) {
        err(
            `connect second param accept a function, but got a ${typeof mapMethodToPage}`
        )
    }
    return function(pageObject) {
        if (!isObject(pageObject)) {
            err(
                `page object connect accept a page object, but got a ${typeof pageObject}`
            )
        }
        // map state to data
        if (!pageObject.data) pageObject.data = {}
        const dataMap = mapStateToData ? mapStateToData(_state) : {}
        for (const dataKey in dataMap) {
            if (pageObject.data.hasOwnProperty(dataKey)) {
                warn(
                    `page object had data ${dataKey}, connect map will cover this prop.`
                )
            }
            pageObject.data[dataKey] = dataMap[dataKey]
        }
        const methodMap = mapMethodToPage
            ? mapMethodToPage(setState, _state)
            : {}
        // map method to page
        for (const methodKey in methodMap) {
            if (pageObject.hasOwnProperty(methodKey)) {
                warn(
                    `page object had method ${methodKey}, connect map will cover this method.`
                )
            }
            pageObject[methodKey] = methodMap[methodKey]
        }
        const onLoad = pageObject.onLoad
        const onUnload = pageObject.onUnload
        pageObject.onLoad = function(options) {
            if (!~_subjects.indexOf(this)) {
                let stateMap = shallowDiffData(
                    this.data,
                    mapStateToData(_state)
                )
                stateMap && this.setData(stateMap)
                _subjects.push(this)
                _observers.push(() => {
                    let stateMap = shallowDiffData(
                        this.data,
                        mapStateToData(_state)
                    )
                    stateMap && this.setData(stateMap)
                })
            }
            onLoad && onLoad.call(this, options)
        }
        pageObject.onUnload = function() {
            const index = _subjects.indexOf(this)
            if (!~index) {
                _subjects.splice(index, 1)
                _observers.splice(index, 1)
            }
            onUnload && onUnload.call(this)
        }
        return pageObject
    }
}

/**
 * 组件连接器
 * @param {Function} mapStateToData
 * @param {Function} mapMethodToPage
 * @return {Function}
 */
function connectComponent(mapStateToData, mapMethodToPage) {
    if (mapStateToData !== undefined && !isFunction(mapStateToData)) {
        err(
            `connect first param accept a function, but got a ${typeof mapStateToData}`
        )
    }
    if (mapMethodToPage !== undefined && !isFunction(mapMethodToPage)) {
        err(
            `connect second param accept a function, but got a ${typeof mapMethodToPage}`
        )
    }
    return function(pageObject) {
        if (!isObject(pageObject)) {
            err(
                `page object connect accept a page object, but got a ${typeof pageObject}`
            )
        }
        if (!pageObject.data) pageObject.data = {}
        const dataMap = mapStateToData ? mapStateToData(_state) : {}
        for (const dataKey in dataMap) {
            if (pageObject.data.hasOwnProperty(dataKey)) {
                warn(
                    `page object had data ${dataKey}, connect map will cover this prop.`
                )
            }
            pageObject.data[dataKey] = dataMap[dataKey]
        }
        if (!pageObject.methods) pageObject.methods = {}
        const methodMap = mapMethodToPage
            ? mapMethodToPage(setState, _state)
            : {}
        for (const methodKey in methodMap) {
            if (pageObject.hasOwnProperty(methodKey)) {
                warn(
                    `page object had method ${methodKey}, connect map will cover this method.`
                )
            }
            pageObject.methods[methodKey] = methodMap[methodKey]
        }
        const attached =
            (pageObject.hasOwnProperty('lifetimes') &&
                pageObject.lifetimes.attached) ||
            pageObject.attached
        const detached =
            (pageObject.hasOwnProperty('lifetimes') &&
                pageObject.lifetimes.detached) ||
            pageObject.detached

        const attachedCache = function(options) {
            if (!~_subjects.indexOf(this)) {
                let stateMap = shallowDiffData(
                    this.data,
                    mapStateToData(_state)
                )
                stateMap && this.setData(stateMap)
                _subjects.push(this)
                _observers.push(() => {
                    let stateMap = shallowDiffData(
                        this.data,
                        mapStateToData(_state)
                    )
                    stateMap && this.setData(stateMap)
                })
            }
            attached && attached.call(this, options)
        }
        const detachedCache = function() {
            const index = _subjects.indexOf(this)
            if (!~index) {
                _subjects.splice(index, 1)
                _observers.splice(index, 1)
            }
            detached && detached.call(this)
        }

        /**
         * 兼容2.2.3以下版本
         */
        if (
            pageObject.hasOwnProperty('lifetimes') &&
            pageObject.lifetimes.attached
        ) {
            pageObject.lifetimes.attached = attachedCache
        } else {
            pageObject.attached = attachedCache
        }
        if (
            pageObject.hasOwnProperty('lifetimes') &&
            pageObject.lifetimes.detached
        ) {
            pageObject.lifetimes.detached = detachedCache
        } else {
            pageObject.detached = detachedCache
        }
        return pageObject
    }
}

/**
 * 同步状态修改
 * @param {Object | Function} state
 */
function setState(state) {
    let newState = state
    if (isFunction(state)) {
        newState = state(_state)
    }
    _state = Object.assign(_state, newState)
    _observers.forEach(function(observer) {
        isFunction(observer) && observer()
    })
}

/**
 * 初始化 Store
 * @param {Object} state
 * @return {Object}
 */
function createStore(state) {
    if (!isObject(state))
        err(`init state accept a object，bug get a ${typeof state}`)
    if (_state)
        warn(
            'there are multiple store active. This might lead to unexpected results.'
        )

    _state = Object.assign({}, state)
    return _Store
}

const _Store = {
    connect,
    connectComponent,
    setState,
    createStore
}

module.exports = _Store
