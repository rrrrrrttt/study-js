function Stu(name, age) {
    this.name = name
    this.age = age
}

function T() {

}


const stu = new Stu('cdm', 20)
console.log(stu);  // 类型为Stu


// 执行Stu里面的函数内容，但是创建出来的是T类型
const Tea = Reflect.construct(Stu, ['cdm','23'], T)

console.log(Tea)