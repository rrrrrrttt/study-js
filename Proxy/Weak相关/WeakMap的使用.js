const obj1 = { name: '123' }
const obj2 = { name: '456' }

const info = {
    [obj1]: 'aaa',
    [obj2]: 'bbb'
}
// 类型会转成字符串作为key
console.log(info)


// WeakMap的使用

//1. key只能是对象
let obj = {
    age: 19
}
const map1 = new Map()
const map2 = new WeakMap()
map1.set(obj, 'aaa-Map')
map2.set(obj, 'aaa-WeakMap')

obj = null

console.log(map1)  // 仍然有值 
console.log(map2) // undefined


// 使用场景

const objVue = {
    name: '123',
    age: 20
}
const mapVue = new Map()
mapVue.set('name', ['fn1','fn2'])
mapVue.set('age', ['fn1', 'fn2'])

const weakVue = new WeakMap()
weakVue.set(objVue, mapVue)
weakVue.get(objVue).get('name')