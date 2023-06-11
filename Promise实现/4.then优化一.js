const PROMISE_STATUS_PENDING = 'pending'
const PROMISE_STATUS_FULFILLED = 'fulfilled'
const PROMISE_STATUS_REJECTED = 'rejected'

class MyPromise {
    constructor(executor) {
        this.status = PROMISE_STATUS_PENDING
        this.onFulfilledFns = []
        this.onRejectedFns = []
        this.value = undefined
        this.reason = undefined
        const resolve = (value) => {
            if (this.status === PROMISE_STATUS_PENDING) {
                queueMicrotask(() => {
                    if(this.status !== PROMISE_STATUS_PENDING) return
                    this.status = PROMISE_STATUS_FULFILLED
                    this.value = value
                    this.onFulfilledFns.map(fn => fn(this.value))
                })
            }
        }

        const reject = (reason) => {
            if (this.status === PROMISE_STATUS_PENDING) {
                queueMicrotask(() => {
                    if(this.status !== PROMISE_STATUS_PENDING) return
                    this.status = PROMISE_STATUS_FULFILLED
                    this.reason = reason
                    this.onFulfilledFns.map(fn => fn(this.reason))
                })
            }
        }

        executor(resolve, reject)
    }

    then(onFulfilled, onRejected) {
        //1. 执行then状态已经确定下来
        if (this.status === PROMISE_STATUS_FULFILLED && onFulfilled) {
            onFulfilled(this.value)
        }
        if (this.status === PROMISE_STATUS_REJECTED && onRejected) {
            onRejected(this.value)
        }
        if (this.status === PROMISE_STATUS_PENDING) {
            this.onFulfilledFns.push(onFulfilled)
            this.onRejectedFns.push(onRejected)
        }
    }
}

const promise = new MyPromise((resolve, reject) => {
    resolve(111)
    reject(222)
})

promise.then(res => {
    console.log('res1: ' + res);
}, err => {
    console.log('err1: ' + err);
})

promise.then(res => {
    console.log('res2: ' + res);
}, err => {
    console.log('err2: ' + err);
})

// 确定promise状态后还要执行then
setTimeout(() => {
    promise.then(res => {
        console.log('res3: ' + res);
    }, err => {
        console.log('err3: ' + err);
    })
}, 1000)