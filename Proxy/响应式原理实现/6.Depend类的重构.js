let activeReactiveFn = null

class Depend {
    constructor() {
        // this.reactiveFns = []
        this.reactiveFns = new Set()
    }

    addDepend(reactiveFn) {
        this.reactiveFns.add(reactiveFn)
    }
    depend () {
        activeReactiveFn && this.reactiveFns.add(activeReactiveFn)
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

// 封装函数，把普通对象变成响应式对象？
const objProxy = new Proxy(obj, {
    get: function (target, key, receiver) {
        getDepend(target, key).depend()
        return Reflect.get(target, key, receiver)
    },
    set: function (target, key, newVal, receiver) {
        Reflect.set(target, key, newVal, receiver)
        getDepend(target, key).notify()
    }
})



watchFn(function () {
    // 不应该被执行多次,  因为方法被添加多次，去重就可以了
    console.log(objProxy.name);
    console.log(objProxy.name);
})

objProxy.name = '222'
