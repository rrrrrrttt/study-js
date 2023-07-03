/**
 * 防抖就是一段时间内不管操作多少次都只执行一次的处理方法
 * 节流就是指定时间段内执行一次的处理方法
 */

function debounce(fn, delay, immediate = false) {
    let timer = null
    let isFlag = false

    const _debounce = function (...args) {
        if (timer) clearTimeout(timer)
        let that = this
        if (immediate && !isFlag) {
            fn.apply(that, args)
            isFlag = true
        } else {
            timer = setTimeout(function () {
                fn.apply(that, ...args)
                isFlag = false
                timer = null
            }, delay)
        }
    }

    return _debounce

}


function throttle(fn, interval, options = { leading: true, trailing: false}) {
    let lastTime = 0
    let timer = null
    const { leading, trailing } = options
    const _throttle = function (...args) {
        const nowTime = new Date().getTime()
        if(!leading && !lastTime) lastTime = nowTime
        const remainTime = interval - (nowTime - lastTime)
        if (remainTime <= 0) {
            // 第一个一定会有一个定时器
            if(timer) {
                clearTimeout(timer)
                timer = null
            }
            fn(this, ...args)
            lastTime = nowTime
            return
        }

        if(trailing && !timer) {
            // 最后一次的剩余执行时间，并且只需要一个定时器
            timer = setTimeout(() => {
                fn(this, ...args)
                lastTime = !leading ? 0 : new Date().getTime()
                timer = null
            }, remainTime)
        }
    }
    return _throttle
}
