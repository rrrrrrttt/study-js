//
Promise.resolve().then(() => {
    console.log(0);
    // return 4

    // 先把resolve放到微任务队列里面，然后才是里面的then

    // return {
    //     then: resolve => {
    //         resolve(4)
    //     }
    // }

    // 不是普通值，多加一次微任务
    return Promise.resolve(6) 
}).then(res => {
    console.log(res);
})

Promise.resolve().then(() => {
    console.log(1);
}).then(() => {
    console.log(2);
}).then(() => {
    console.log(3);
}).then(() => {
    console.log(4);
}).then(() => {
    console.log(5);
})

