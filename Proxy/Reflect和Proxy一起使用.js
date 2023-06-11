const obj = {
    name: 'abc',
    age: 20
}

const objProxy = new Proxy(obj, {
    get: function (target, key, receiver) {
        return Reflect.get(target, key)
    },
    set: function (target, key, newVal, receiver) {
        Reflect.set(target, key, newVal)
    }
})

// Reflect 对于操作的失败或者错误 会返回boolean值 不会返回具体错误
objProxy.name = 'ghf'

console.log(objProxy.name)