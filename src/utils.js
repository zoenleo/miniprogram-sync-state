const _toString = Object.prototype.toString

module.exports = {
    /**
     * is function
     * @param {*} obj
     * @return {Boolean}
     */
    isFunction(obj) {
        return typeof obj === 'function' || false
    },

    /**
     * is object
     * @param {*} obj
     * @return {Boolean}
     */
    isObject(obj) {
        return _toString.call(obj) === '[object Object]' || false
    },

    /**
     * console warn
     * @param {String} str
     */
    Warn(str) {
        console.warn(str)
    },

    /**
     * throw Error
     * @param {String} str
     */
    Err(str) {
        throw new Error(str)
    }
}
