const obj = {
    name: 'aaa',
    age: 12,
    arr: [1, 2, 3, 4],
    person: {
        a: 1,
        b: 1
    },
    toJSON: function() {
        console.log('111');
    }
}


// 最终会调用toJSON方法
console.log(JSON.stringify(obj));
// 转化两个
console.log(JSON.stringify(obj, ['arr', 'person']));
// 转化拦截
console.log(JSON.stringify(obj, (key, value) => {
    if (key === 'age') {
        value += 1
    }
    return value
}));
console.log(JSON.stringify(obj, null, 2));