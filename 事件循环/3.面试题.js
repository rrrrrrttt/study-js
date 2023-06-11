let resolvePromise = new Promise(resolve => {
    return Promise.resolve()
})
resolvePromise.then(() => {
    console.log('resolvePromise resolved')
})
let resolvedPromiseThen = Promise.resolve().then(res => {
    console.log('promise1')
})
resolvedPromiseThen
    .then(() => {
        console.log('promise2')
    })
    .then(() => {
        console.log('promise3')
    })

// promise1
// promise2
// resolvePromise resolved
// promise3