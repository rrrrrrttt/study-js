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


// 展开运算符
console.log([...iteratorObj]);

// 解构语法

// 创建一些其他对象

// promise.all

Promise.all(iteratorObj).then(res => console.log(res))

// 对象不可以for...of，但是可以使用展开运算符