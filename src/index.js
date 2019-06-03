import { isFunction, isObject, Warn, Err } from './utils'

/**
 * 状态存储
 */
let _state = null

/**
 * 参数
 */
let _options = null

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
    const { slow } = _options
    if (mapStateToData !== undefined && !isFunction(mapStateToData)) {
        Err(
            `connect first param accept a function, but got a ${typeof mapStateToData}`
        )
    }
    if (mapMethodToPage !== undefined && !isFunction(mapMethodToPage)) {
        Err(
            `connect second param accept a function, but got a ${typeof mapMethodToPage}`
        )
    }
    const dataMap = mapStateToData ? mapStateToData(_state) : {}
    const methodMap = mapMethodToPage ? mapMethodToPage(setState, _state) : {}
    return function(pageObject) {
        if (!isObject(pageObject)) {
            Err(
                `page object connect accept a page object, but got a ${typeof pageObject}`
            )
        }
        for (const dataKey in dataMap) {
            if (pageObject.data) {
                if (pageObject.data.hasOwnProperty(dataKey)) {
                    Warn(
                        `page object had data ${dataKey}, connect map will cover this prop.`
                    )
                }
                pageObject.data[dataKey] = dataMap[dataKey]
            } else {
                pageObject.data = {
                    [dataKey]: dataMap[dataKey]
                }
            }
        }
        for (const methodKey in methodMap) {
            if (pageObject.hasOwnProperty(methodKey)) {
                Warn(
                    `page object had method ${methodKey}, connect map will cover this method.`
                )
            }
            pageObject[methodKey] = methodMap[methodKey]
        }
        const actionKey = slow ? 'onShow' : 'onLoad'
        const onActive = pageObject[actionKey]
        const onUnload = pageObject.onUnload
        pageObject.onLoad = function(options) {
            if (!~_subjects.indexOf(this)) {
                this.setData(mapStateToData ? mapStateToData(_state) : {})
                _subjects.push(this)
                _observers.push(() => {
                    this.setData(mapStateToData ? mapStateToData(_state) : {})
                })
            }
            onActive && onActive.call(this, options)
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
 * @param {Object} options
 * @return {Object}
 */
function createStore(state, options = {}) {
    _options = options
    if (!isObject(state)) throw Error('init state can not be undefined')
    if (_state) {
        Warn(
            'there are multiple store active. This might lead to unexpected results.'
        )
    }
    _state = Object.assign({}, state)
    return _Store
}

const _Store = {
    connect,
    setState,
    createStore
}

module.exports = _Store
