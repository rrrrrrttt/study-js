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
function watchFn(fn) {
    depend.addDepend(fn)
}

const objProxy = new Proxy(obj, {
    get: function (target, key, receiver) {
        return Reflect.get(target, key, receiver)
    },
    set: function (target, key, newVal, receiver) {
        Reflect.set(target, key, newVal, receiver)
        // 应该每个属性对应自己的depend ，怎么做?
        depend.notify()
    }
})

watchFn(function () {
    console.log(obj.name);
})

objProxy.name = '222'

