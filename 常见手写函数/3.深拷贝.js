// JSON深拷贝，函数和Symbol以及循环引用不可以

/**
 * 注意点
 * 1.递归调用
 * 2.判断是否为对象
 */
function isObject(value) {
    const valueType = typeof value
    return (value !== null) && (valueType === 'object' || valueType === 'function')
}

function deepClone(originValue, map = new WeakMap()) {
    // 判断Map与Set
    if (originValue instanceof Set) {
        return new Set([...originValue])
    }
    if (originValue instanceof Map) {
        return new Map([...originValue])
    }
    // 是Symbol，创建Symbol
    if (typeof originValue === 'symbol') {
        return Symbol(originValue.description)
    }

    if (!isObject(originValue) || typeof originValue === 'function') {
        return originValue
    }

    if(map.has(originValue)) {
        return map.get(originValue)
    }

    const newObject = Array.isArray(originValue) ? [] : {}
    map.set(originValue, newObject)
    for (const key in originValue) {
        newObject[key] = originValue[key]
    }

    const symbolKeys = Object.getOwnPropertySymbols(originValue)
    for (const sKey of symbolKeys) {
        newObject[sKey] = deepClone(originValue[sKey], map)
    }
    return newObject
}

const obj = {
    name: 'abc',
    age: 18,
    // 对象嵌套
    friend: {
        name: 'james',
        address: {
            city: 'aaaa'
        }
    },
    // 数组
    habbies: [1, 2, 3, 4],
    //函数
    foo: () => { },
    // Symbol
    [s1]: s1,
    s2: s2,
    // Set/Map
    set: new Set(['aaa', 'bbb']),
    map: new Map([['aaa', 'bbb']]),
}