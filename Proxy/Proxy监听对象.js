const obj = {
    name: 'abc',
    age: 18
}

const proxyObj = new Proxy(obj, {
    get: function (target, key, receiver) {
        console.log('taget的属性' + key + '被访问了')
        return target[key]
    },
    set: function (target, key, newVal, receiver) {
        console.log('taget的属性' + key + '被设置成新值' + newVal)
        target[key] = newVal
    }
})

// console.log(proxyObj.name)
// console.log(proxyObj.age)


proxyObj.name = 'ghf'
proxyObj.age = 20
