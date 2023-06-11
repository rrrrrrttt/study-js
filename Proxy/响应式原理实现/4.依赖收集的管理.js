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

const depend = new Depend()
//  响应式函数
function watchFn(fn) {
    depend.addDepend(fn)
}
// 获取depend的函数
const targetMap = new WeakMap()
function getDepend(target, key) {
    // 1. 获取对应的weakMap
    let map = targetMap.get(target)
    // 但是第一次是没有的，需要创建一个
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
        return Reflect.get(target, key, receiver)
    },
    set: function (target, key, newVal, receiver) {
        Reflect.set(target, key, newVal, receiver)
        // 这个depend是总体的，不可行
        // depend.notify()

        const depend = getDepend(target, key)
        console.log(depend.reactiveFns);
        //  这个只是set时候执行，直接使用呢？
        depend.notify()
    }
})



watchFn(function () {
    console.log(obj.name);
})

objProxy.name = '222'


// 找到obj某个属性对应的depend，然后执行notify函数

// const map = new Map()
// map.set('name', depend)
// const weakMap = new WeakMap()
// weakMap.set(obj, map)
