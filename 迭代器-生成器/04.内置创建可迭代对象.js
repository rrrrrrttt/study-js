// 数组本身也是一个可迭代对象，里面有迭代器
const names = ['aaa', 'bbb', 'ccc']
for (const item of names) {
    console.log(item);
}

// Map/Set; arguments; String均内置了迭代器