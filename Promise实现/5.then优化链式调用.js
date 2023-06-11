const PROMISE_STATUS_PENDING = 'pending'
const PROMISE_STATUS_FULFILLED = 'fulfilled'
const PROMISE_STATUS_REJECTED = 'rejected'


function excuFn(excuFn, val, resolve, reject) {
    try {
        const result = excuFn(val)
        resolve(result)
    } catch (error) {
        reject(error)
    }
}

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
                    if (this.status !== PROMISE_STATUS_PENDING) return
                    this.status = PROMISE_STATUS_FULFILLED
                    this.value = value
                    this.onFulfilledFns.map(fn => fn(this.value))
                })
            }
        }

        const reject = (reason) => {
            if (this.status === PROMISE_STATUS_PENDING) {
                queueMicrotask(() => {
                    if (this.status !== PROMISE_STATUS_PENDING) return
                    this.status = PROMISE_STATUS_REJECTED
                    this.reason = reason
                    this.onRejectedFns.map(fn => fn(this.reason))
                })
            }
        }
        try {
            executor(resolve, reject)
        } catch (error) {
            reject(error)
        }
    }

    then(onFulfilled, onRejected) {
        return new MyPromise((resolve, reject) => {
            if (this.status === PROMISE_STATUS_FULFILLED && onFulfilled) {
                excuFn(onFulfilled, this.value, resolve, reject)
            }
            if (this.status === PROMISE_STATUS_REJECTED && onRejected) {
                excuFn(onRejected, this.reason, resolve, reject)
            }
            if (this.status === PROMISE_STATUS_PENDING) {
                this.onFulfilledFns.push(() => excuFn(onFulfilled, this.value, resolve, reject))
                this.onRejectedFns.push(() => excuFn(onRejected, this.reason, resolve, reject))
            }
        })
    }
}

const promise = new MyPromise((resolve, reject) => {
    console.log('状态pending~');
    resolve(111)
    // reject(222)
})

promise.then(res => {
    console.log('res1: ' + res);
    throw new Error('1313')
}, err => {
    console.log('err1: ' + err);
    return 355
}).then(res => {
    console.log('res2: ' + res);
}, err => {
    console.log('err2: ' + err);
})
