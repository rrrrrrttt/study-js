class Depend {
    constructor() {
        this.reactiveFns = []
    }

    addDepend(reactiveFn) {
        this.reactiveFns.push(reactiveFn)
    }

    notify() {
        this.reactiveFns.forEach(reactiveFn => {
            reactiveFn()
        })
    }
}

const obj = {
    name: 'aaa',
    age: 20
}

//  响应式函数
let activeReactiveFn = null
function watchFn(fn) {
    activeReactiveFn = fn
    fn()
}
// 获取depend的函数
const targetMap = new WeakMap()
function getDepend(target, key) {
    // 1. 获取对应的weakMap
    let map = targetMap.get(target)
    if (!map) {
        map = new Map()
        targetMap.set(target, map)
    }

    // 2. 根据key获取depend
    let depend = map.get(key)
    if (!depend) {
        depend = new Depend()
        map.set(key, depend)
    }

    return depend
}

const objProxy = new Proxy(obj, {
    get: function (target, key, receiver) {
        // 里面能否不依赖其他变量？
        getDepend(target, key).addDepend(activeReactiveFn)
        return Reflect.get(target, key, receiver)
    },
    set: function (target, key, newVal, receiver) {
        Reflect.set(target, key, newVal, receiver)
        getDepend(target, key).notify()
    }
})



watchFn(function () {
    console.log(objProxy.name);
})

objProxy.name = '222'
