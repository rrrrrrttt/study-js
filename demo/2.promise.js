const PROMISE_STATUS_PENDING = 'pending'
const PROMISE_STATUS_REJECTED = 'rejected'
const PROMISE_STATUS_FULFILLED = 'fulfilled'


function handleErr(fn, value, resolve, reject) {
    try {
        const result = fn(value)
        if (result && result.then && typeof result.then === 'function') {
            result.then(resolve, reject)
        } else if (result && result instanceof myPromise) {
            result.then(resolve, reject)
        } else {
            result && resolve(result)
        }

    } catch (error) {
        reject(error)
    }
}

class myPromise {
    constructor(executor) {
        this.status = PROMISE_STATUS_PENDING
        this.value = undefined
        this.reason = undefined
        this.onFulfilledFns = []
        this.onRejectedFns = []
        const resolve = value => {
            if (this.status === PROMISE_STATUS_PENDING) {
                queueMicrotask(() => {
                    if (this.status !== PROMISE_STATUS_PENDING) return
                    this.value = value
                    this.status = PROMISE_STATUS_FULFILLED
                    this.onFulfilledFns.forEach(fn => fn(this.value))
                })
            }
        }

        const reject = reason => {
            if (this.status === PROMISE_STATUS_PENDING) {
                queueMicrotask(() => {
                    if (this.status !== PROMISE_STATUS_PENDING) return
                    this.reason = reason
                    this.status = PROMISE_STATUS_REJECTED
                    this.onRejectedFns.forEach(fn => fn(this.reason))
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
        onRejected = onRejected || (reason => { throw reason })
        onFulfilled = onFulfilled || (value => value)
        return new myPromise((resolve, reject) => {
            if (this.status === PROMISE_STATUS_FULFILLED) {
                handleErr(onFulfilled, this.value, resolve, reject)
            }
            if (this.status === PROMISE_STATUS_REJECTED) {
                handleErr(onRejected, this.reason, resolve, reject)
            }
            if (this.status === PROMISE_STATUS_PENDING) {
                this.onFulfilledFns.push(() => handleErr(onFulfilled, this.value, resolve, reject))
                this.onRejectedFns.push(() => handleErr(onRejected, this.reason, resolve, reject))
            }
        })
    }
    catch(onRejected) {
        return this.then(undefined, onRejected)
    }

    static resolve(value) {
        return new myPromise(resolce => resolce(value))
    }
    static reject(reason) {
        return new myPromise((_, reject) => reject(reason))
    }

    static all(promises) {
        return new myPromise((resolve, reject) => {
            const results = []
            promises.forEach(promise => {
                promise.then(res => {
                    results.push(res)
                    if (results.length === promises.length) {
                        resolve(results)
                    }
                }, reject)
            })
        })
    }
    static allSettled(promises) {
        return new myPromise((resolve, reject) => {
            const results = []
            promises.forEach(promise => {
                promise.then(res => {
                    results.push({ value: res, status: PROMISE_STATUS_FULFILLED })
                    if (results.length === promises.length) {
                        resolve(results)
                    }
                }, err => {
                    results.push({ value: err, status: PROMISE_STATUS_REJECTED })
                    if (results.length === promises.length) {
                        resolve(results)
                    }
                })

            })
        })
    }

    finally(onFinally) {
        this.then(
            res => myPromise.resolve(onFinally()).then(() => res),
            err => myPromise.reject(onFinally()).then(() => err)
        )
    }
}

const p = new myPromise((resolve, reject) => {
    resolve('res')
})

p.then(res => {
    console.log(res);
}).finally(() => {
    console.log('aaa');
})
