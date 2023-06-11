var x = 0


// 参数有默认值，会形成一个新的作用域用于保存参数的值
function foo (x, y = function () {x =3 ;console.log(x)}) {
    console.log(x);
    var x = 2
    y()
    console.log(x);
}

foo()
console.log(x);