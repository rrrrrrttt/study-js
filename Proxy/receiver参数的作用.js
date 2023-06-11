const obj = {
    _name: 'abc',
    get name () {
        return this._name
    },
    set name(newVal) {
        this._name = newVal
    }
}

const objProxy = new Proxy(obj, {
    get: function (target, key, receiver) {
        console.log('get方法', key)
        // console.log(receiver === objProxy)
        // 改变this，让obj里面的拦截走到这里
        return Reflect.get(target, key, receiver)
    },
    set: function (target, key, newVal, receiver) {
        Reflect.set(target, key, newVal, receiver)
    }
})

objProxy.name = 'ghf'

console.log(objProxy.name)