/**
 * 注意点
 * 1.leading的作用开始是否执行
 *      1.1 默认是首次开始执行的，因为lastTime为0
 *      1.2 !leading && !lastTime 否则remainTime一直大于0，无法执行
 * 2.trailing的作用是最后一次是否执行
 *      2.1 除非两次change间隔大于两秒，否则最后一次不会执行
 *      2.2 只能有一个timer，否则第一次输入后，第二次又会产生新的 (没到时间的话)
 *      2.3 在interval时间正好触发，但是又到了定时器的时间，不能执行两次（刚好会清空定时器，但是过了interval一点点呢？）
 *      2.4 setTimeout执行后，需要把timer置为null，重新计时（要不然进入不到setTimeout）
 */

function throttle(fn, interval, options = { leading: true, trailing: false }) {
    const { leading, trailing } = options
    let lastTime = 0
    let timer = null
    const _throttle = function (...args) {
        const nowTime = new Date().getTime()
        if (!leading && !lastTime) lastTime = nowTime
        // debugger
        const remainTime = interval - (nowTime - lastTime)
        if (remainTime <= 0) {
            if (timer) {
                clearTimeout(timer)
                timer = null
            }
            fn.apply(this, args)
            lastTime = nowTime
            return
        }

        if (trailing && !timer) {
            timer = setTimeout(() => {
                fn.apply(this, args)
                timer = null
                // 就是说 remainTime很小，上面还来不及取消
                lastTime = leading ? lastTime = new Date().getTime() : 0
            }, remainTime);
        }
    }

    return _throttle
}