
/**
 * 每一个函数都会有原型，其是一个普通的对象用于共享函数和属性
 * 原型链是由多个对象原型组成的链式结构，当对象本身没有属性或者方法时，会沿着原型链查找，直到null
 */

// 创建单个对象：字面量和构造函数
// 批量创建对象：工厂模式和构造函数模式

/**
 * new关键字干了啥？
 *  创建了一个新对象 => 构造函数的显式原型赋值给新对象的隐式原型 => this绑定为这个新对象
 * => 有函数体直接执行 => 返回新对象
 */

// 实现一个new

function myNew (fn, ...args) {
    const newObj = Object.create(fn.prototype)
    const result = fn.apply(newObj, args)
    return result ? typeof result === 'object' ? result : newObj : newObj
}


/**
 * 1.原型直接继承
 *      缺点：继承的属性看不见，缺少constructor，参数无法传递，类型不对, 引用类型相互影响
 */

function Person () {
}

function Student () {
}

Student.prototype = new Person

/**
 * 2. 借用构造函数
 *      缺点：继承属性可以看到了，因为this直接添加了属性，类型还是不对，子类加东西影响父类，constructor还是没有
 */

function Person () {
}

function Student (...args) {
    Person.call(this, args)
}

Student.prototype = new Person

/**
 * 3.寄生组合式继承
 */

function inherit (subType, superType) {
    subType.prototype = Object.create(superType.prototype)
    subType.prototype.constructor = Object.defineProperty(subType.prototype, 'constructor', {
        writable: true,
        value: subType,
        enumerable: false,
        configurable: true
    })
}

function Person () {
}

function Student (...args) {
    Person.call(this, args)
}

