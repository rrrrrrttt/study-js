// new 关键字

const obj1 = new Object()

// 字面量

const obj = {
    name: 'aaaa'
}



// Object.defineProperty
Object.defineProperty(obj, 'name', {
    writable: true,
    enumerable: false, //为false的情况下
    configurable: true,
    value: 'aaaa'
})


console.log(obj); // no
console.log(obj.hasOwnProperty('name'));  // yes