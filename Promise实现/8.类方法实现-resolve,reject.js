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
        onRejected = onRejected || (err => { throw err })
        onFulfilled = onFulfilled || (value => value)
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

    catch(onRejected) {
        return this.then(undefined, onRejected)
    }

    finally(onFinally) {
        this.then(onFinally, onFinally)
    }

    static resolve(value) {
        return new MyPromise(resolve => resolve(value))
    }

    static reject(reason) {
        return new MyPromise((_, reject) => reject(reason))
    }
}




MyPromise.resolve(1213).then(res => {
    console.log(res);
})
MyPromise.reject('error').catch(err => {
    console.log(err);
})
