// 1.有next函数，无参数
// 2.返回对象，包含done和value
let index = 0
const iterator = {
    next: function () {
        // return { done: false, value: 'aaa' }
        // return { done: false, value: 'aaa' }
        // return { done: false, value: 'aaa' }
        // return { done: true , undefined}
        if (index < names.length) {
            return { done: false, value: names[index++] }
        } else {
            return { donw: true, value: undefined }
        }
    }
}

const names = ['aaa', 'bbb', 'cccc']

console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());