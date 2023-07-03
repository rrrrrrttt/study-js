/**
浅拷贝创建一个新的对象或数组，但内部的数据是共享的。
深拷贝创建一个新的对象或数组，完全独立于原始对象或数组，包括嵌套的对象和数组。
*/

// 拓展运算符只可以复制基本数据，一些引用类型则直接复制引用
// JSON序列化不会复制函数，循环引用以及其他特性类型

// 实现一个深拷贝函数
function isObject(obj) {
    return (typeof obj === 'function' || typeof obj === 'object') && obj
}

function cloneDeep(obj, map = new WeakMap()) {
    if (!isObject(obj)) {
        return obj
    }
    // 循环引用
    if(map.has(obj)) {
        return map.get(obj)
    }
    // 函数直接返回
    if (typeof obj === 'function') {
        return obj
    }
    // symbol
    if (typeof obj === 'symbol') {
        return Symbol(obj.description)
    }

    const newObj = Array.isArray(obj) ? [] : {}
    map.set(obj, newObj)
    for (const key in obj) {
        newObj[key] = cloneDeep(obj[key], map)
    }

    for (const key in Object.getOwnPropertySymbols(obj)) {
        newObj[key] = cloneDeep(obj[key], map)
    }

    return newObj
}