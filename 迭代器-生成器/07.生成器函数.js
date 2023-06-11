function* foo() {
    console.log('开始执行');

    const value1 = 11
    console.log(value1);
    yield value1

    const value2 = 22
    console.log(value2);
    yield value2

    const value3 = 33
    console.log(value3);
    yield value3

    console.log('执行结束');

    return 11111
}

//生成迭代器
const generator = foo()
console.log(generator.next());
console.log(generator.next());
console.log(generator.next());
console.log(generator.next());
generator.next()
generator.next()
generator.next()