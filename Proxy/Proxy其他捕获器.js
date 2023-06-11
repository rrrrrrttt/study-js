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
    },
    has: function (target, key) {
        console.log('监听对象的in操作', key)
        return key in target
    },
    deleteProperty: function(target, key) {
        console.log('监听对象的删除操作' + key)
        delete target[key]
    }
})


console.log('name' in proxyObj)
delete proxyObj.name

