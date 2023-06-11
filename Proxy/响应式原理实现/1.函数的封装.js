//思路：依赖收集 => 监听 => 执行方法
let reactiveFns = []
function watchFn(fn) {
    reactiveFns.push(fn)
}

reactiveFns.forEach(i => {
    i()
})


// 上方一串代码能不能使用类进行管理？
const obj = {
    name: 'aaa',
    age: 18
}

watchFn(function () {
    console.log(obj.name);
})


