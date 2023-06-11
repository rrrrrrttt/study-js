// 可迭代对象必须实现@@iterator以及符合可迭代协议
const iteratorObj = {
    names: ['aaa', 'bbb', 'ccc'],
    [Symbol.iterator]: function() {
        let index = 0
        return {
            next: () => {
                if(index < this.names.length) {
                    return { done: false, value: this.names[index++] }
                } else {
                    return { done: true, value: undefined }
                }
            }
        }
    }
}
// iterator就是可迭代对象


// 用处
// 1.for...of可以遍历的必须是可迭代对象  done为true可以停止掉！！
for (const item of iteratorObj) {
    console.log(item);
}