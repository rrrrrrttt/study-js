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

    // 想清楚执行与不执行条件
    static all(promises) {
        return new MyPromise((resolve, reject) => {
            const result = []
            promises.forEach(promise => {
                promise.then(res => {
                    result.push(res)
                    if (result.length === promises.length) resolve(result)
                }, err => {
                    reject(err)
                })
            })
        })
    }

    static allSettled(promises) {
        return new MyPromise(resolve => {
            const result = []
            promises.forEach(promise => {
                promise.then(res => {
                    result.push({status: PROMISE_STATUS_FULFILLED, value: res})
                    if(result.length === promises.length) resolve(result)
                }, err => {
                    result.push({status: PROMISE_STATUS_REJECTED, reason: err})
                    if(result.length === promises.length) resolve(result)
                })
            })
        })
    }
}

const p1 = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve('123')
    }, 1000);
})
const p2 = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve('123')
    }, 3000);
})
const p3 = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        // resolve('123')
        reject('error')
    }, 2000);
})


MyPromise.all([p1,p2,p3]).then(res => {
    console.log(res);
},err => {
    console.log(err);
})

MyPromise.allSettled([p1,p2,p3]).then(res => {
    console.log(res);
})


