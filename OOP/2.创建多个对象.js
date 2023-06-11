// 1.工厂模式
function createPerson(name, age, height) {
    const p = new Object // 不传递参数可不写括号
    p.name = name
    p.age = age
    p.height = height
    p.eat = function() {
        console.log('eat~')
    }
    return p
}
/**
 * 1.获取不到创建的类型
 * 2.
 */


// 2.构造函数：通过new关键字调用
/**
 * 1.创建空对象
 * 2.这个对象内部的__proto__赋值为构造函数的prototype属性
 * 3.this指向这个新对象
 * 4.执行函数的内部代码
 * 5.返回新对象
 */
function Person (name, age) {
    // 为什么此处可以用this？看第三条
    this.name = name
    this.age = age
}

const p = new Person('aaa', 12)

/**
 * 每次都要创建新对象，重复函数浪费内存
 */

