function request(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(url)
        }, 1000);
    })
}

// why => whyaaa => whyaaabbb
// 1.回调
request('why').then(res => {
    request(res + 'aaa').then(res => {
        request(res + 'bbb').then(res => {
            console.log(res);
        })
    })
})

// 2.return
request('why').then(res => {
    return request(res + 'aaa')
}).then(res => {
    return request(res + 'bbb')
}).then(res => {
    console.log(res);
})

// 3.generator + Promise
function* getData() {
   const res1 = yield request('why')
   const res2 = yield request(res1 + 'aaa')
   console.log(res2);
}

// const generator = getData()
// generator.next().value.then(res => {
//     generator.next(res).value.then(res => {
//         console.log(generator.next(res));
//     })
// })

function execGenerator(genFn) {
    const generator = genFn()

    function exec(res) {
        const result = generator.next(res)
        if(result.done) {
            return result.value
        }
        result.value.then(res => {
            exec(res)
        })
    }

    exec()
}
// co库
execGenerator(getData)