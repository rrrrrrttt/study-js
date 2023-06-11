function* createIterator(arr) {
    // let index = 0
    // yield arr[index++]
    // yield arr[index++]
    // yield arr[index++]


    // for (const iterator of arr) {
    //     yield iterator
    // }


    yield* arr
}



function* createNum(min, max) {
    // let index = min
    // return {
    //     next: function () {
    //         if (index < max) {
    //             return { done: false, value: index++ }
    //         } else {
    //             return { done: true, value: undefined }
    //         }
    //     }
    // }

    let index = min
    while (index++ < max) {
        yield index
    }
}

const numIterator = createNum(10,20)
console.log(numIterator.next());
console.log(numIterator.next());
console.log(numIterator.next());

const iterator = createIterator([111, 222, 333]);
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());