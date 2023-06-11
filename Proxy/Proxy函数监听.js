
function getName() {
    console.log(this.name)
}

const foo = new Proxy(getName, {
    apply: function (target, thisArg, argArr) {
        console.log('对getName进行了apply操作')
        return target.apply(thisArg)
    },
    construct: function (target, argArr, newTraget) {
        console.log('进行了new操作', argArr)
        return new target(...argArr)
    }
})

getName()

foo.apply({ name: '12345' })

new foo('abc', 'cfg')