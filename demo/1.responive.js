const obj = {
    name: 'aaa'
}
const targetMap = new WeakMap()
let activeReactiveFn = null


class Depend {
    constructor() {
        this.reactiveFns = new Set()
    }

    addDepend(fn) {
        this.reactiveFns.add(fn)
    }

    depend() {
        activeReactiveFn && this.addDepend(activeReactiveFn)
    }

    notify() {
        this.reactiveFns.forEach(fn => fn())
    }
}

function getDepend(target, key) {
    // return targetMap.get(target).get(key)
    let map = targetMap.get(target)
    if (!map) {
        map = new Map()
        targetMap.set(target, map)
    }
    let depend = map.get(key)
    if (!depend) {
        depend = new Depend()
        map.set(key, depend)
    }
    return depend
}

function reactive(obj) {
    return new Proxy(obj, {
        get: function (target, key, receiver) {
            getDepend(target, key).depend()
            return Reflect.get(target, key, receiver)
        },
        set: function (target, key, newVal, receiver) {
            Reflect.set(target, key, newVal, receiver)
            getDepend(target, key).notify()
        }
    })
}


function watchFn(fn) {
    activeReactiveFn = fn
    fn()
    activeReactiveFn = null
}

const objProxy = reactive(obj)
watchFn(function () {
    console.log(objProxy.name);
    console.log(objProxy.name);
    console.log(objProxy.name);
})

objProxy.name = 'bbb'