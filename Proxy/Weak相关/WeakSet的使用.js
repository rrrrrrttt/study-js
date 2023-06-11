


// 里面只能放对象
// weakset.add({name: '1131'})


// 对对象是一个弱引用

let obj = {
    name: 'abc'
}

const set = new Set()
set.add(set)

const weakSet = new WeakSet()
weakSet.add(obj)

obj = null
console.log(set.size)  // 虽然obj为null，但是set保存了其内存地址，里面依然有值
console.log(weakSet.has(obj)) // obj为null，里面无值

// 应用场景

const weakC = new WeakSet()

class Person {
    constructor() {
        weakC.add(this)
    }
    running() {
        if(!weakC.has(this)) {
            throw new Error('')
        }
        console.log('running~', this)
    }
}

const p = new Person()

p.running()

p.running.call({name: '123'})