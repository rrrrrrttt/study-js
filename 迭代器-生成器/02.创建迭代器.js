function createIterator(arr) {
    if(!Array.isArray(arr)) return
    let index = 0
    return {
        next: function() {
            if(index < arr.length) {
                return { done: false, value: arr[index++] }
            } else {
                return { done: true, value: undefined }
            }
        }
    }
}

const nameIterator = createIterator(['aaa', 'bbb', 'ccc'])

console.log(nameIterator.next());
console.log(nameIterator.next());
console.log(nameIterator.next());
console.log(nameIterator.next());