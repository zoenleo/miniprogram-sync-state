const _toString = Object.prototype.toString

function isFunction(obj) {
    return typeof obj === 'function' || false
}

function isObject(obj) {
    return _toString.call(obj) === '[object Object]' || false
}

let _state = null
const _subjects = []
const _observers = []

function connect(mapStateToData, mapMethodToPage) {
    if (mapStateToData !== undefined && !isFunction(mapStateToData)) {
        throw new Error(
            `connect first param accept a function, but got a ${typeof mapStateToData}`
        )
    }
    if (mapStateToData !== undefined && !isFunction(mapMethodToPage)) {
        throw new Error(
            `connect second param accept a function, but got a ${typeof mapMethodToPage}`
        )
    }
    const dataMap = mapStateToData ? mapStateToData(_state) : {}
    const methodMap = mapMethodToPage ? mapMethodToPage(setState, _state) : {}
    return function(pageObject) {
        if (!isObject(pageObject)) {
            throw new Error(
                `page object connect accept a page object, but got a ${typeof pageObject}`
            )
        }
        for (const dataKey in dataMap) {
            if (pageObject.hasOwnProperty('data')) {
                if (pageObject.data.hasOwnProperty(dataKey)) {
                    console.warn(
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
                console.warn(
                    `page object had method ${methodKey}, connect map will cover this method.`
                )
            }
            pageObject[methodKey] = methodMap[methodKey]
        }
        const onLoad = pageObject.onLoad
        const onUnload = pageObject.onUnload
        pageObject.onLoad = function(options) {
            if (!~_subjects.indexOf(this)) {
                this.setData(mapStateToData ? mapStateToData(_state) : {})
                _subjects.push(this)
                _observers.push(() => {
                    this.setData(mapStateToData ? mapStateToData(_state) : {})
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

function createStore(state) {
    if (_state) {
        console.warn(
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
