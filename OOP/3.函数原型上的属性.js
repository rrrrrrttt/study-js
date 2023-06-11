function foo() {

}

// 给原型上加东西一般是重写，记得加上constructor
foo.prototype = {
    name: 'aaa',
    age: 12
}

Object.defineProperty(foo.prototype, 'constructor', {
    enumerable: false,
    value: foo,
    writable: true,
    configurable: true
})

console.log(foo.prototype);
console.log(Object.getOwnPropertyDescriptors(foo.prototype));

// 避免浪费内存，重复方法可以放在原型上
function Person(name,age) {
    this.name = name
    this.age = age
}
Person.prototype.eat = function() {
    console.log('eat~')
}

const p1 = new Person('aaa', 12)
