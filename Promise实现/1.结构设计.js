const PROMISE_STATUS_PENDING = 'pending'
const PROMISE_STATUS_FULFILLED = 'fulfilled'
const PROMISE_STATUS_REJECTED = 'rejected'

class MyPromise {
    constructor (executor) {
        this.status = PROMISE_STATUS_PENDING
        const resolve = (value) => {
            if(this.status === PROMISE_STATUS_PENDING) {
                this.status = PROMISE_STATUS_FULFILLED
                console.log(value)
            }
        }

        const reject = (reason) => {
            if(this.status === PROMISE_STATUS_PENDING) {
                this.status = PROMISE_STATUS_REJECTED
                console.log(reason)
            }
        }

        executor (resolve, reject)
    }
}

const promise = new MyPromise((resolve, reject) => {
    resolve(111)
    reject(222)
})