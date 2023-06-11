function inheritPrototype(SubType, SuperType) {
    SubType.prototype = Object.create(SuperType.prototype)
    SubType.prototype.constructor = Object.defineProperty(SubType, 'constructor', {
        enumerable: false,
        writable: true,
        configurable: true,
        value: SubType
    })
}

function Person(name, age) {
    this.name = name
    this.age = age
}

Person.prototype.eating = function () {
    console.log('eatting~');
}

function Student(name, age) {
    Person.call(this, name, age)
    this.sno = '111'
}

// 为什么会出现多余属性：就是因为在这里多调用了一次
// Student.prototype = new Person
// Student.prototype = Object.create(Person.prototype)

inheritPrototype(Student, Person)


Student.prototype.studying = function () {
    console.log('studying~');
}

var stu = new Student('cdm', '222')

console.log(stu);
console.log(stu instanceof Student);
console.log(stu instanceof Person);
console.log(stu instanceof Object);
// console.log(stu.__proto__);