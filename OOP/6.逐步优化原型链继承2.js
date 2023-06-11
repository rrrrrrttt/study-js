const obj = {
    name: 'aaa',
    age: 12
}
function createObject (o) {
    function Fn() {}
    Fn.prototype = o
    return new Fn
}
// 等同于

function createObject2 (o) {
    const newObj = {}
    Object.create(o, newObj)
    return newObj
}
// 等同于
const newObj = Object.create(obj)


console.log(newObj);
console.log(newObj.__proto__);