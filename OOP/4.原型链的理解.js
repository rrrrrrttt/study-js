const obj = {}


// 是一个对象，那么它也有__proto__
obj.__proto__ = {}
obj.__proto__.__proto__ = {}
obj.__proto__ .__proto__.__proto__= {
    name: 'aaa'
}

console.log(obj.name)

//但是不能一直找，找到那一层停止呢？：找到Object.prototype上停止，顶层就是Object的原型对象