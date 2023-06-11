const PROMISE_STATUS_PENDING = 'pending'
const PROMISE_STATUS_FULFILLED = 'fulfilled'
const PROMISE_STATUS_REJECTED = 'rejected'

class MyPromise {
    constructor (executor) {
        this.onFulfilled = undefined
        this.onRejected = undefined
        this.status = PROMISE_STATUS_PENDING
        const resolve = (value) => {
            if(this.status === PROMISE_STATUS_PENDING) {
                this.status = PROMISE_STATUS_FULFILLED
                queueMicrotask(() => {
                    this.onFulfilled(value)
                })
            }
        }

        const reject = (reason) => {
            if(this.status === PROMISE_STATUS_PENDING) {
                this.status = PROMISE_STATUS_REJECTED
                queueMicrotask(() => {
                    this.onRejected(reason)
                })
            }
        }

        executor (resolve, reject)
    }

    then (onFulfilled, onRejected) {
        this.onFulfilled = onFulfilled
        this.onRejected = onRejected
    }
}

const promise = new MyPromise((resolve, reject) => {
    resolve(111)
    reject(222)
})

promise.then(res => {
    console.log('res: ' + res);
}, err => {
    console.log('err: ' + err);
})