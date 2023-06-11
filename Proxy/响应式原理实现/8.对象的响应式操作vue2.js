let activeReactiveFn = null

class Depend {
    constructor() {
        // this.reactiveFns = []

        // 打印的同时，改变name
        this.reactiveFns = new Set()
    }
    addDepend(reactiveFn) {
        this.reactiveFns.add(reactiveFn)
    }
    depend() {
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

// 响应式对象
function reactive(obj) {
   Object.keys(obj).forEach(key => {
        let value = obj[key]
        Object.defineProperty(obj, key, {
            get: function () {
                getDepend(obj, key).depend()
                return value
            },
            set: function (newVal) {
                value = newVal
                getDepend(obj, key).notify()
            }
        })
    })
    return obj
}

watchFn(function () {
    // 不应该被执行多次,  因为方法被添加多次，去重就可以了
    console.log(reactive(obj).name);
    console.log(reactive(obj).name);
})

reactive(obj).name = '222'
