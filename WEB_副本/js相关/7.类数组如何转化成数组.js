
// Array.from
const arrayLike = { 0: "a", 1: "b", 2: "c", length: 3 };
const array = Array.from(arrayLike);
console.log(array);
// Array.prototype.slice.call
const arrayLike1 = { 0: "a", 1: "b", 2: "c", length: 3 };
const array2 = Array.prototype.slice.call(arrayLike);
console.log(array2); 
// 拓展运算符
const arrayLike3 = { 0: "a", 1: "b", 2: "c", length: 3 };
const array3 = [...arrayLike];
console.log(array3);
// concat
const arrayLike4 = { 0: "a", 1: "b", 2: "c", length: 3 };
const array4 = [].concat(arrayLike);
console.log(array4);



