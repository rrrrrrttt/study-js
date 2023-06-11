const obj = {
    age: 20,
    name: 'cmd',
    friends: {
        name: 'kobe'
    }
}

// 引用赋值
const info1 = obj
obj.friends.name = 'aaa'
console.log(info1);

// 浅拷贝：拓展运算符...
const info2 = { ...obj }
obj.friends.name = 'bbb'
console.log(info2);

// JSON不可以存在深拷贝，加入里面存在函数，直接移除
