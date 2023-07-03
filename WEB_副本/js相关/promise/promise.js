/**
 * ES6新增处理异步回调的一种机制
 * 1.有三种状态pending，fulfilled，rejected
 * 2.接收一个executor函数，并且参数是两个函数resolve和reject，成功调用resolve，失败调用reject
 * 3.then方法接收两个参数onFulfilled和onRejected，分别表reolve回调和reject回调，返回一个新promise
 * 优点
 *    1.解决回调地狱的问题
 *    2.统一并规范异步api
 *    3.易于编码的异步调用
 * 缺点
 *    1.没有取消功能
 *    2.无法查看进度
 */

function isObject(o) {
    return typeof o === 'object' && !!o
}

function isFunction(fn) {
    return typeof fn === 'function'
}

function handlePromise(promise, result, resolve, reject) {
    if (promise === result) {
        return reject(new TypeError('err'))
    }
    let called = false
    // result 为 MyPromise
    if (result instanceof MyPromise) {
        result.then(v => {
            handlePromise(promise, v, resolve, reject)
        }, j => {
            reject(j)
        })
        // 判断是否为thenable对象或者普通对象
    } else if (isObject(result) || isFunction(result)) {
        try {
            const { then } = result
            if (isFunction(then)) {
                then.call(result, v => {
                    if (called) return
                    called = true
                    handlePromise(promise, v, resolve, reject)
                }, j => {
                    if (called) return
                    called = true
                    reject(j)
                })
            } else {
                resolve(result)
            }
        } catch (error) {
            if (called) return
            called = true
            reject(error)
        }
    } else {
        resolve(result)
    }
}

const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
    constructor(executor) {
        this.value = undefined
        this.reason = undefined
        this.status = PENDING
        this.onFulfilledFns = []
        this.onRejectedFns = []

        const resolve = value => {
            if (this.status === PENDING) {
                this.value = value
                this.status = FULFILLED
                this.onFulfilledFns.forEach(fn => {
                    fn(this.value)
                })
            }
        }
        const reject = reason => {
            if (this.status === PENDING) {
                this.reason = reason
                this.status = REJECTED
                this.onRejectedFns.forEach(fn => {
                    fn(this.reason)
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
        onFulfilled = isFunction(onFulfilled) ? onFulfilled : v => v
        onRejected = isFunction(onRejected) ? onRejected : err => { throw err }

        const promise1 = new MyPromise((resolve, reject) => {

            // 微任务
            const microTask = (fn, value) => {
                queueMicrotask(() => {
                    try {
                        const result = fn(value)
                        handlePromise(promise1, result, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                })
            }

            if (this.status === FULFILLED) {
                microTask(onFulfilled, this.value)
            } else if (this.status === REJECTED) {
                microTask(onRejected, this.reason)
            } else {
                this.onFulfilledFns.push(() => {
                    microTask(onFulfilled, this.value)
                })
                this.onRejectedFns.push(() => {
                    microTask(onRejected, this.reason)
                })
            }
        })
        return promise1
    }

    catch(onRejected) {
        return this.then(undefined, onRejected)
    }

    finally(onFinally) {
        return this.then(value => {
            return new MyPromise(onFinally()).then(_ => value)
        }, reason => {
            return new MyPromise(onFinally()).then(_ => { throw reason })
        })
    }

    static resolve(value) {
        if (value instanceof MyPromise) {
            return value
        }
        return new MyPromise(resolve => resolve(value))
    }

    static reject(reason) {
        return new MyPromise((_, reject) => reject(reason))
    }

    static 
}
module.exports = {
    resolved: MyPromise.resolve,
    rejected: MyPromise.reject,
    deferred() {
        const result = {};
        result.promise = new MyPromise((resolve, reject) => {
            result.resolve = resolve;
            result.reject = reject;
        });
        return result;
    }
};