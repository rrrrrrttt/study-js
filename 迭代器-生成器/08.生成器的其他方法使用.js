function* foo(num) {
    console.log('开始执行');
    const value1 = 11 * num
    console.log(value1);
    try {
       yield value1  //第二个next的参数作为第一个yield的返回值
    } catch (error) {
        console.log(error);
        yield 'abc' // 可以继续往下执行
    }

    // return count  相当于在这里return
    console.log('继续执行');
    const value2 = 22 * num
    console.log(value2);
    yield value2

    const value3 = 33
    console.log(value3);
    yield value3

    console.log('执行结束');

    return 11111
}

const generator = foo(5)
generator.next()
generator.throw('error')  //如果捕获异常，代码可以继续执行
console.log(generator.next());





//总结
// 1.迭代器：是一个对象，返回一个对象，实现next方法(返回值为{done: ** , value: **})
// 2.可迭代对象：实现了@@iterator和可迭代协议
//应用场景：展开语法/Map/Set/for...of/解构语法等等
// 3.生成器：一种特殊的迭代器，使用yiled控制代码执行
// 4.yeild可以有返回值，为value
// 5.第二次的next参数为上一次的yiled执行后的返回值
// 6.里面有return和throw函数，return相当于终止执行，返回值为value，
                        // throw可以在内部捕获错误，捕获后仍可以继续执行