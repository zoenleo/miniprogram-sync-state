module.exports = /******/ (function(modules) {
    // webpackBootstrap
    /******/ // The module cache
    /******/ var installedModules = {} // The require function
    /******/
    /******/ /******/ function __webpack_require__(moduleId) {
        /******/
        /******/ // Check if module is in cache
        /******/ if (installedModules[moduleId]) {
            /******/ return installedModules[moduleId].exports
            /******/
        } // Create a new module (and put it into the cache)
        /******/ /******/ var module = (installedModules[moduleId] = {
            /******/ i: moduleId,
            /******/ l: false,
            /******/ exports: {}
            /******/
        }) // Execute the module function
        /******/
        /******/ /******/ modules[moduleId].call(
            module.exports,
            module,
            module.exports,
            __webpack_require__
        ) // Flag the module as loaded
        /******/
        /******/ /******/ module.l = true // Return the exports of the module
        /******/
        /******/ /******/ return module.exports
        /******/
    } // expose the modules object (__webpack_modules__)
    /******/
    /******/
    /******/ /******/ __webpack_require__.m = modules // expose the module cache
    /******/
    /******/ /******/ __webpack_require__.c = installedModules // define getter function for harmony exports
    /******/
    /******/ /******/ __webpack_require__.d = function(exports, name, getter) {
        /******/ if (!__webpack_require__.o(exports, name)) {
            /******/ Object.defineProperty(exports, name, {
                enumerable: true,
                get: getter
            })
            /******/
        }
        /******/
    } // define __esModule on exports
    /******/
    /******/ /******/ __webpack_require__.r = function(exports) {
        /******/ if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
            /******/ Object.defineProperty(exports, Symbol.toStringTag, {
                value: 'Module'
            })
            /******/
        }
        /******/ Object.defineProperty(exports, '__esModule', { value: true })
        /******/
    } // create a fake namespace object // mode & 1: value is a module id, require it // mode & 2: merge all properties of value into the ns // mode & 4: return value when already ns object // mode & 8|1: behave like require
    /******/
    /******/ /******/ /******/ /******/ /******/ /******/ __webpack_require__.t = function(
        value,
        mode
    ) {
        /******/ if (mode & 1) value = __webpack_require__(value)
        /******/ if (mode & 8) return value
        /******/ if (
            mode & 4 &&
            typeof value === 'object' &&
            value &&
            value.__esModule
        )
            return value
        /******/ var ns = Object.create(null)
        /******/ __webpack_require__.r(ns)
        /******/ Object.defineProperty(ns, 'default', {
            enumerable: true,
            value: value
        })
        /******/ if (mode & 2 && typeof value != 'string')
            for (var key in value)
                __webpack_require__.d(
                    ns,
                    key,
                    function(key) {
                        return value[key]
                    }.bind(null, key)
                )
        /******/ return ns
        /******/
    } // getDefaultExport function for compatibility with non-harmony modules
    /******/
    /******/ /******/ __webpack_require__.n = function(module) {
        /******/ var getter =
            module && module.__esModule
                ? /******/ function getDefault() {
                      return module['default']
                  }
                : /******/ function getModuleExports() {
                      return module
                  }
        /******/ __webpack_require__.d(getter, 'a', getter)
        /******/ return getter
        /******/
    } // Object.prototype.hasOwnProperty.call
    /******/
    /******/ /******/ __webpack_require__.o = function(object, property) {
        return Object.prototype.hasOwnProperty.call(object, property)
    } // __webpack_public_path__
    /******/
    /******/ /******/ __webpack_require__.p = '' // Load entry module and return exports
    /******/
    /******/
    /******/ /******/ return __webpack_require__((__webpack_require__.s = 0))
    /******/
})(
    /************************************************************************/
    /******/ [
        /* 0 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict'

            var _typeof =
                typeof Symbol === 'function' &&
                typeof Symbol.iterator === 'symbol'
                    ? function(obj) {
                          return typeof obj
                      }
                    : function(obj) {
                          return obj &&
                              typeof Symbol === 'function' &&
                              obj.constructor === Symbol &&
                              obj !== Symbol.prototype
                              ? 'symbol'
                              : typeof obj
                      }

            var _utils = __webpack_require__(1)

            /**
             * 浅比较当前date和新的stateMap，并返回更小粒度的更新
             * @param {String} data
             * @param {String} stateMap
             * @return {Object | false}
             */

            function shallowDiffData(data, stateMap) {
                if (!(0, _utils.isObject)(stateMap)) return false
                var newMap = {}
                var hasDiff = false
                for (var key in stateMap) {
                    if (stateMap[key] !== data[key]) {
                        hasDiff = true
                        newMap[key] = stateMap[key]
                    }
                }
                console.log('%c this is colored', hasDiff && newMap)
                return hasDiff && newMap
            }

            /**
             * 状态存储
             */
            var _state = null

            /**
             * 页面实例
             */
            var _subjects = []

            /**
             * 观察者
             */
            var _observers = []

            /**
             * 连接器
             * @param {Function} mapStateToData
             * @param {Function} mapMethodToPage
             * @return {Function}
             */
            function connect(mapStateToData, mapMethodToPage) {
                if (
                    mapStateToData !== undefined &&
                    !(0, _utils.isFunction)(mapStateToData)
                ) {
                    ;(0, _utils.Err)(
                        'connect first param accept a function, but got a ' +
                            (typeof mapStateToData === 'undefined'
                                ? 'undefined'
                                : _typeof(mapStateToData))
                    )
                }
                if (
                    mapMethodToPage !== undefined &&
                    !(0, _utils.isFunction)(mapMethodToPage)
                ) {
                    ;(0, _utils.Err)(
                        'connect second param accept a function, but got a ' +
                            (typeof mapMethodToPage === 'undefined'
                                ? 'undefined'
                                : _typeof(mapMethodToPage))
                    )
                }
                return function(pageObject) {
                    if (!(0, _utils.isObject)(pageObject)) {
                        ;(0, _utils.Err)(
                            'page object connect accept a page object, but got a ' +
                                (typeof pageObject === 'undefined'
                                    ? 'undefined'
                                    : _typeof(pageObject))
                        )
                    }
                    var dataMap = mapStateToData ? mapStateToData(_state) : {}
                    var methodMap = mapMethodToPage
                        ? mapMethodToPage(setState, _state)
                        : {}
                    for (var dataKey in dataMap) {
                        if (pageObject.data) {
                            if (pageObject.data.hasOwnProperty(dataKey)) {
                                ;(0, _utils.Warn)(
                                    'page object had data ' +
                                        dataKey +
                                        ', connect map will cover this prop.'
                                )
                            }
                            pageObject.data[dataKey] = dataMap[dataKey]
                        } else {
                            var _pageObject$data

                            pageObject.data = ((_pageObject$data = {}),
                            (_pageObject$data[dataKey] = dataMap[dataKey]),
                            _pageObject$data)
                        }
                    }
                    for (var methodKey in methodMap) {
                        if (pageObject.hasOwnProperty(methodKey)) {
                            ;(0, _utils.Warn)(
                                'page object had method ' +
                                    methodKey +
                                    ', connect map will cover this method.'
                            )
                        }
                        pageObject[methodKey] = methodMap[methodKey]
                    }
                    var onLoad = pageObject.onLoad
                    var onUnload = pageObject.onUnload
                    pageObject.onLoad = function(options) {
                        var _this = this

                        if (!~_subjects.indexOf(this)) {
                            var stateMap = shallowDiffData(
                                this.data,
                                mapStateToData(_state)
                            )
                            stateMap && this.setData(stateMap)
                            _subjects.push(this)
                            _observers.push(function() {
                                var stateMap = shallowDiffData(
                                    _this.data,
                                    mapStateToData(_state)
                                )
                                stateMap && _this.setData(stateMap)
                            })
                        }
                        onLoad && onLoad.call(this, options)
                    }
                    pageObject.onUnload = function() {
                        var index = _subjects.indexOf(this)
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
                if (
                    mapStateToData !== undefined &&
                    !(0, _utils.isFunction)(mapStateToData)
                ) {
                    ;(0, _utils.Err)(
                        'connect first param accept a function, but got a ' +
                            (typeof mapStateToData === 'undefined'
                                ? 'undefined'
                                : _typeof(mapStateToData))
                    )
                }
                if (
                    mapMethodToPage !== undefined &&
                    !(0, _utils.isFunction)(mapMethodToPage)
                ) {
                    ;(0, _utils.Err)(
                        'connect second param accept a function, but got a ' +
                            (typeof mapMethodToPage === 'undefined'
                                ? 'undefined'
                                : _typeof(mapMethodToPage))
                    )
                }
                return function(pageObject) {
                    if (!(0, _utils.isObject)(pageObject)) {
                        ;(0, _utils.Err)(
                            'page object connect accept a page object, but got a ' +
                                (typeof pageObject === 'undefined'
                                    ? 'undefined'
                                    : _typeof(pageObject))
                        )
                    }
                    var dataMap = mapStateToData ? mapStateToData(_state) : {}
                    var methodMap = mapMethodToPage
                        ? mapMethodToPage(setState, _state)
                        : {}
                    for (var dataKey in dataMap) {
                        if (pageObject.hasOwnProperty('data')) {
                            if (pageObject.data.hasOwnProperty(dataKey)) {
                                ;(0, _utils.Warn)(
                                    'page object had data ' +
                                        dataKey +
                                        ', connect map will cover this prop.'
                                )
                            }
                            pageObject.data[dataKey] = dataMap[dataKey]
                        } else {
                            var _pageObject$data2

                            pageObject.data = ((_pageObject$data2 = {}),
                            (_pageObject$data2[dataKey] = dataMap[dataKey]),
                            _pageObject$data2)
                        }
                    }
                    for (var methodKey in methodMap) {
                        if (methodMap.hasOwnProperty('mothods')) {
                            if (pageObject.hasOwnProperty(methodKey)) {
                                ;(0, _utils.Warn)(
                                    'page object had method ' +
                                        methodKey +
                                        ', connect map will cover this method.'
                                )
                            }
                            pageObject.mothods[methodKey] = methodMap[methodKey]
                        } else {
                            var _pageObject$mothods

                            pageObject.mothods = ((_pageObject$mothods = {}),
                            (_pageObject$mothods[methodKey] =
                                methodMap[methodKey]),
                            _pageObject$mothods)
                        }
                    }
                    var attached =
                        (pageObject.hasOwnProperty('lifetimes') &&
                            pageObject.lifetimes.attached) ||
                        pageObject.attached
                    var detached =
                        (pageObject.hasOwnProperty('lifetimes') &&
                            pageObject.lifetimes.detached) ||
                        pageObject.detached

                    var attachedCache = function attachedCache(options) {
                        var _this2 = this

                        if (!~_subjects.indexOf(this)) {
                            var stateMap = shallowDiffData(
                                this.data,
                                mapStateToData(_state)
                            )
                            stateMap && this.setData(stateMap)
                            _subjects.push(this)
                            _observers.push(function() {
                                var stateMap = shallowDiffData(
                                    _this2.data,
                                    mapStateToData(_state)
                                )
                                stateMap && _this2.setData(stateMap)
                            })
                        }
                        attached && attached.call(this, options)
                    }
                    var detachedCache = function detachedCache() {
                        var index = _subjects.indexOf(this)
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
                var newState = state
                if ((0, _utils.isFunction)(state)) {
                    newState = state(_state)
                }
                _state = Object.assign(_state, newState)
                _observers.forEach(function(observer) {
                    ;(0, _utils.isFunction)(observer) && observer()
                })
            }

            /**
             * 初始化 Store
             * @param {Object} state
             * @return {Object}
             */
            function createStore(state) {
                if (!(0, _utils.isObject)(state))
                    (0, _utils.Err)(
                        'init state accept a object\uFF0Cbug get a ' +
                            (typeof state === 'undefined'
                                ? 'undefined'
                                : _typeof(state))
                    )
                if (_state) {
                    ;(0, _utils.Warn)(
                        'there are multiple store active. This might lead to unexpected results.'
                    )
                }
                _state = Object.assign({}, state)
                return _Store
            }

            var _Store = {
                connect: connect,
                connectComponent: connectComponent,
                setState: setState,
                createStore: createStore
            }

            module.exports = _Store

            /***/
        },
        /* 1 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict'

            var _toString = Object.prototype.toString

            module.exports = {
                /**
                 * is function
                 * @param {*} obj
                 * @return {Boolean}
                 */
                isFunction: function isFunction(obj) {
                    return typeof obj === 'function' || false
                },

                /**
                 * is object
                 * @param {*} obj
                 * @return {Boolean}
                 */
                isObject: function isObject(obj) {
                    return _toString.call(obj) === '[object Object]' || false
                },

                /**
                 * console warn
                 * @param {String} str
                 */
                Warn: function Warn(str) {
                    console.warn(str)
                },

                /**
                 * throw Error
                 * @param {String} str
                 */
                Err: function Err(str) {
                    throw new Error(str)
                }
            }

            /***/
        }
        /******/
    ]
)
