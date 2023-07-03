function cancelPromise(promise) {
    let hasCancel = false
    const makePromise = new Promise((resolve, reject) => {
        promise.then(v => hasCancel ? reject('error') : resolve(v), j => hasCancel ? reject('error') : reject(j))
    })
    return {
        promise: makePromise,
        cancel: () => {
            hasCancel = true
        }
    }
}