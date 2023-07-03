/**
 * this 是一个特殊的关键字，包含当前函数执行的上下文
 * 规则：new绑定 > 显示绑定 > 隐式绑定 > 默认绑定
 */
Function.prototype.mycall = function (thisArg, ...argArray) {
    thisArg = [null, undefined].includes(thisArg) ? {} : Object(thisArg)

    const fn = Symbol('fn')

    thisArg[fn] = this

    const result = thisArg[fn](...argArray)

    delete thisArg[fn]

    return result
}
Function.prototype.myapply = function (thisArg, ...argArray) {
    thisArg = [null, undefined].includes(thisArg) ? {} : Object(thisArg)

    const fn = Symbol('fn')

    thisArg[fn] = this

    const result = thisArg[fn](argArray || [])

    delete thisArg[fn]

    return result
}
Function.prototype.mybind = function (thisArg, ...argArray) {
    thisArg = [null, undefined].includes(thisArg) ? {} : Object(thisArg)

    const fn = Symbol('fn')
    thisArg[fn] = this

    return function () {
        const result = thisArg[fn]([...argArray, ...arguments])
        delete thisArg[fn]
        return result
    }
}
