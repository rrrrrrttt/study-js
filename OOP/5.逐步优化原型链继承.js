
function Person1() {
    this.name = 'why'
}

Person1.prototype.eating = function () {
    console.log('eatting~');
}

function Student1() {
    this.sno = '111'
}


Student1.prototype = new Person1

Student1.prototype.studying = function () {
    console.log('studying~');
}


/**
 * 名称：原型直接继承
 * 第一种原理：new会返回一个对象，这个对象的隐式原型指向构造函数的显式原型
 * 缺点：
 *      类型不一致：因为new之后类型取决于构造函数的返回值，如果无返回值就是构造函数的类型
 *                因为Student就是Person，student继承Student的类型
 *      继承的属性看不到：因为被放到原型链上了
 *      引用类型会相互影响：指向同一内存地址   
 *      参数不好传递，如何把参数放到父类里面
 *      需要加上constructor函数
 */


function Person2(name, age) {
    this.name = name
    this.age = age
}

Person2.prototype.eating = function () {
    console.log('eatting~');
}

function Student2(name, age) {
    Person2.call(this, name, age)
    this.sno = '111'
}


Student2.prototype = new Person2
// 给子类添加方法会也会放到父类上
// Student2.prototype = Person2.prototype

Student2.prototype.studying = function () {
    console.log('studying~');
}

/**
 * 名称：构造函数继承
 * 原理：call改变this
 * 解决的：不会相互影响；继承的属性可以看到
 * 缺点：
 *      构造函数会调用两次
 *      类型还是不变
 *      constructor还是没有
 *      new出来的对象隐式原型上会存在多余的属性，其实是没必要存在的
 */


