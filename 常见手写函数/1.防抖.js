/**
 * 注意点
 * 1.参数和this的传递
 * 2.immediate只是让下一次开始立即执行
 */

function debounce(fn, delay, immediate = false) {
    let timer = null
    let isInvoke = false
    let _debounce = function (...args) {
        timer && clearTimeout(timer)

        if (immediate && !isInvoke) {
            fn.apply(this, args)
            isInvoke = true
        } else {
            timer = setTimeout(() => {
                fn.apply(this, args) // 传递this和参数
                isInvoke = false
                timer = null
            }, delay);
        }
    }
    return _debounce
}