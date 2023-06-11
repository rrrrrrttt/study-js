var personObj = {
    running: function () {
        console.log('running~');
    }
}

// Object.create就是把参数对象赋值给新对象的隐式原型

function createStu (o, name) {
    const stu = Object.create(o)
    stu.name = name
    return stu
}

const stu = createStu(personObj, 'adad')


console.log(stu);
console.log(stu.__proto__);