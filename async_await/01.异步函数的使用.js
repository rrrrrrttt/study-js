async function foo() {
    console.log('aaa');
    return 123
}

foo().then(res => {
    console.log(res);
})

// 内部代码一次执行，与普通函数一致
// 返回值为promise
// 异步函数异常，会被作为异步函数返回promise的reject的值（普通函数停止）


async function foo1() {
    const res = await 1233
}

// await后面和Pormise里面renturn情况一致