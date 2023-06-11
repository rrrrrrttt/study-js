class Depend {
    constructor () {
        this.reactiveFns = []
    }

    addDepend(reactiveFn) {
        this.reactiveFns.push(reactiveFn)
    }

    notify () {
        this.reactiveFns.forEach(reactiveFn => {
            reactiveFn()
        })
    }
}

const obj = {
    name: 'aaa',
    age: 20
}

const depend = new Depend()
function watchFn (fn) {
    depend.addDepend(fn)
}

watchFn(function () {
    console.log(obj.name);
})

// 现在是手动执行，能不能自动执行？
depend.notify()

