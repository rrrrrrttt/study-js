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
}

const promise = new MyPromise((resolve, reject) => {
    console.log('状态pending~');
    // resolve(111)
    reject(222)
})


/** 为什么加了cacth不能执行finally？已下方代码为例：第一个promise没有错误回调，是以链式调用的，然后返回第二个Promise，
而第二个promise无成功回调，无法继续执行 */
promise.then(res => {
    console.log('res1: ' + res);
    throw new Error('1313')
}).catch(err => {
    console.log(err);
}).finally(() => {
    console.log('finally');
})
