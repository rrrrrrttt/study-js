class ClassRoom {
    constructor(name, address, stu) {
        this.name = name
        this.address = address
        this.stu = stu
    }

    enter(newStu) {
        this.stu.push(newStu)
    }

    [Symbol.iterator]() {
        let index = 0
        return {
            next: () => {
                if (index < this.stu.length) {
                    return { done: false, value: this.stu[index++] }
                } else {
                    return { done: true, value: undefined }
                }
            },
            return: () => {
                console.log('监听到结束了')
                return {  done: true, value: undefined }
            }
        }
    }
}

const room1 = new ClassRoom('a', 'b', [11, 22, 33])

for (const item of room1) {
    console.log(item);
    if(item === 22) break
}

